import type {
  DoctorViewAllInput,
  IDoctorViewAllAppointmentUseCase,
} from "#application/ports/use-cases/doctor/appointment/IDoctorViewAllAppointmentUseCase.js";
import type { PaginationResponse } from "#shared/types/pagination.types.js";
import type { IDoctorViewAllAppointmentDTO } from "./IDoctorViewAllAppointmentDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import { DoctorViewAllAppointmentMapper } from "./DoctorViewAllAppointmentMapper.js";

export class DoctorViewAllAppointmentUseCase implements IDoctorViewAllAppointmentUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async execute(
    doctorId: string,
    input: DoctorViewAllInput
  ): Promise<PaginationResponse<IDoctorViewAllAppointmentDTO[]>> {
    this._logger.info("Doctor View All Appointment Attempt", {
      doctorId,
      input,
    });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const { date, search, status, type, page, limit } = input;

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (date) {
      startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
    }
    const { appointments, totalCount } =
      await this._appointmentRepo.findManyWithFilters({
        doctorId,
        page,
        limit,
        patientSearch: search ?? null,
        order: "asc",
        status: status ?? null,
        consultationType: type ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
      });

    return {
      pagination: { page: page, limit: limit, totalCount },
      data: DoctorViewAllAppointmentMapper.toDto(appointments),
    };
  }
}
