import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IToggleBlockPatientUseCase } from "#application/ports/use-cases/admin/patient/IToggleBlockPatientUseCase.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class ToggleBlockPatientUseCase implements IToggleBlockPatientUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository
  ) {}
  async execute(userId: string): Promise<void> {
    this._logger.info("Toggle Block patient attempt", { userId });

    const patient = await this._patientRepo.findById(userId);

    if (!patient) {
      throw new AppError("User not found", HTTPStatus.NOT_FOUND);
    }

    if (!patient.isProfileComplete()) {
      throw new AppError("Patient profile not completed", HTTPStatus.NOT_FOUND);
    }

    patient.toogleBlockStatus();

    await this._patientRepo.update(patient);
  }
}
