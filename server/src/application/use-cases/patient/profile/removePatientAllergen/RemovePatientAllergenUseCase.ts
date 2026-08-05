import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRemovePatientAllergenUseCase } from "#application/ports/use-cases/patient/profile/IRemovePatientAllergenUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class RemovePatientAllergenUseCase implements IRemovePatientAllergenUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository
  ) {}
  async execute(patientId: string, allergenId: string): Promise<void> {
    this._logger.info("Remove Allergen Request", { patientId, allergenId });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    patient.removeAllergen(allergenId);

    await this._patientRepo.update(patient);
  }
}
