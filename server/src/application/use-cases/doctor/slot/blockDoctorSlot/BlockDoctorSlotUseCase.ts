import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorBlockShiftRepository } from "@application/ports/repositories/IDoctorBlockShiftRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IUnitOfWork } from "@application/ports/services/IUnitOfWork.ts";
import type {
  IBlockDoctorInput,
  IBlockDoctorSlotUseCase,
} from "@application/ports/use-cases/doctor/slot/IBlockDoctorSlotUseCase.ts";
import { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { ConflictError } from "@shared/errors/ConflictError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class BlockDoctorSlotUseCase implements IBlockDoctorSlotUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _idGenerator: IIDGenerator,
    private readonly _blockShiftRepo: IDoctorBlockShiftRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _uow: IUnitOfWork
  ) {}
  async execute(
    doctorId: string,
    input: IBlockDoctorInput
  ): Promise<
    | {
        blocked: boolean;
        blockDetails: unknown;
        reason: string;
        appointments: unknown;
      }
    | { blocked: true }
  > {
    this._logger.info("Block schedule attempt", input);

    const BLOCK_PREFIX = process.env.BLOCK_PREFIX!;
    const blockShift = new DoctorBlockShift(
      this._idGenerator.generate(BLOCK_PREFIX),
      doctorId,
      input.startTime,
      input.endTime,
      input.reason,
      new Date()
    );

    return await this._uow.execute(async (session) => {
      const blockShiftRepo = this._blockShiftRepo.withSession(session);
      const appointmentRepo = this._appointmentRepo.withSession(session);

      // check if current blocks overrides existing ones
      const existingBlocks = await blockShiftRepo.findByDate(
        doctorId,
        blockShift.startTime
      );

      if (!blockShift.isNotOverlapping(existingBlocks)) {
        throw new AppError(
          "Block at given time already exists",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const dayStart = new Date(input.startTime);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(input.endTime);
      dayEnd.setHours(23, 59, 59, 999);

      const appointments = await appointmentRepo.findAllWithFilters({
        doctorId,
        startDate: dayStart,
        endDate: dayEnd,
        statuses: [APPOINTMENT_STATUS.ONGOING, APPOINTMENT_STATUS.CONFIRMED],
      });

      const overlappingAppointments = appointments.filter(
        ({ appointment }) =>
          appointment.startTime < input.endTime &&
          appointment.endTime > input.startTime
      );
      if (overlappingAppointments.length > 0 && !input.force) {
        return {
          blocked: false,
          appointments: overlappingAppointments.map(
            ({ appointment, patientName }) => ({
              appointmentId: appointment.id,
              patientName,
              date: appointment.startTime,
              type: appointment.consultationType,
            })
          ),
          blockDetails: {
            startTime: input.startTime,
            endTime: input.endTime,
            reason: input.reason,
          },
          reason: "APPOINTMENT_OVERLAP",
        };
      }

      await Promise.all(
        overlappingAppointments.map(async ({ appointment }) => {
          appointment.cancelByDoctor(input.reason);
          return appointmentRepo.update(appointment);
        })
      );

      // save block
      await blockShiftRepo.create(blockShift);

      return { blocked: true };
    });
  }
}
