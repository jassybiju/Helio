import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IUnitOfWork } from "@application/ports/services/IUnitOfWork.ts";
import type {
  IDoctorScheduleInput,
  ISetDoctorScheduleUseCase,
} from "@application/ports/use-cases/doctor/schedule/ISetDoctorScheduleUseCase.ts";
import { DoctorShift } from "@domain/entities/DoctorShift.ts";
import { Time } from "@domain/value-objects/Time.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class SetDoctorScheduleUseCase implements ISetDoctorScheduleUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _uow: IUnitOfWork,
    private readonly _doctorShiftRepo: IDoctorShiftRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _doctorRepo: IDoctorRepository
  ) {}
  async execute(doctorId: string, input: IDoctorScheduleInput): Promise<void> {
    this._logger.info("Set Doctor ScheduleUseCase", {
      doctorId,
      options: input,
    });
    return this._uow.execute(async (session) => {
      const doctorSlot = this._doctorRepo.withSession(session);
      const shiftRepo = this._doctorShiftRepo.withSession(session);

      // validation if doctor exists
      const doctor = await doctorSlot.findById(doctorId);

      if (!doctor) {
        throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
      }

      if (!doctor.canAccessPlatform()) {
        throw new AppError(MESSAGE.INVALID_REQUEST, HTTPStatus.FORBIDDEN);
      }

      if (!doctor.onlineFee || !doctor.clinicFee) {
        throw new AppError(
          "Set Fee to create scheudle",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const {
        dayOfWeek,
        location,
        startTime,
        endTime,
        slotIntervalInMinutes,
        capacityPerSlot,
        consultationType,
      } = input;

      // creating new Shift instance
      const SHIFT_PREFIX = process.env.SHIFT_PREFIX!;
      const newShifts = [];

      for (const day of dayOfWeek) {
        if (!day) continue;

        const newShift = new DoctorShift(
          this._idGenerator.generate(SHIFT_PREFIX),
          doctorId,
          day,
          new Time(startTime),
          new Time(endTime),
          consultationType,
          location ?? null,
          slotIntervalInMinutes,
          capacityPerSlot,
          new Date()
        );

        // getting existing shift of the doctor on the day
        const existingShift = await shiftRepo.findAllByDoctorAndDay(
          doctorId,
          day
        );

        // checking if overlap exists
        const isNotOverLapping = newShift.isNotOverLapping(existingShift);
        if (!isNotOverLapping) {
          throw new AppError(
            MESSAGE.DOCTOR_SHEDULE_OVERLAP_ERROR,
            HTTPStatus.UNPROCESSBLE_ENTITY
          );
        }

        newShifts.push(newShift);
      }

      // saves doctorShift
      await this._doctorShiftRepo.bulkInsert(newShifts);
    });
  }
}
