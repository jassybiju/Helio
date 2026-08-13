import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetPatientUseCase } from "#application/ports/use-cases/admin/patient/IGetPatientUseCase.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type { IGetPatientResponseDTO } from "./IGetPatientDTO.js";
import { GetPatientMapper } from "./GetPatientMapper.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";

export class GetPatientUseCase implements IGetPatientUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}

  async execute(patientId: string): Promise<IGetPatientResponseDTO> {
    this._logger.info("Get Patient Attempt", { patientId });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new AppError("Patient Not found", HTTPStatus.NOT_FOUND);
    }

    const appointments = await this._appointmentRepo.findManyWithFilters({
      patientId: patient.id,
      limit: 5,
      order: "desc",
    });
    return GetPatientMapper.toDto(
      patient,
      appointments.appointments,
      appointments.totalCount
    );
  }
}
