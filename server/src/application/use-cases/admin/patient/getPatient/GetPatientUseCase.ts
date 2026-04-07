import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetPatientUseCase } from "@application/ports/use-cases/admin/patient/IGetPatientUseCase.ts";
import type { Patient } from "@domain/entities/Patient.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class GetPatientUseCase implements IGetPatientUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository
  ) {}

  async execute(patientId: string): Promise<Patient> {
    this._logger.info("Get Patient Attempt", { patientId });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new AppError("Patient Not found", HTTPStatus.NOT_FOUND);
    }

    return patient;
  }
}
