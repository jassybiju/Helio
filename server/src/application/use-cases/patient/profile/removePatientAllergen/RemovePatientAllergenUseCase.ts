import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IRemovePatientAllergenUseCase } from "@application/ports/use-cases/patient/profile/IRemovePatientAllergenUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
