import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAddPatientAllergenUseCase } from "#application/ports/use-cases/patient/profile/IAddPatientAllergenUseCase.js";
import type { ALLERGEN_SEVERITY } from "#domain/common/enums/allergen_severity.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class AddPatientAllergenUseCase implements IAddPatientAllergenUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _idGenerator: IIDGenerator
  ) {}
  async execute(
    patientId: string,
    allergen: string,
    severity: ALLERGEN_SEVERITY
  ): Promise<void> {
    this._logger.info("Add Allergen Attempt", { patientId, allergen });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }
    patient.addAllergen({
      _id: this._idGenerator.generate(process.env.ALLERGEN_PREFIX!),
      allergen,
      severity,
    });

    await this._patientRepo.update(patient);
  }
}
