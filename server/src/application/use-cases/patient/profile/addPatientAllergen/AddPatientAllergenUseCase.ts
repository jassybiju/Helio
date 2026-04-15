import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IAddPatientAllergenUseCase } from "@application/ports/use-cases/patient/profile/IAddPatientAllergenUseCase.ts";
import type { ALLERGEN_SEVERITY } from "@domain/common/enums/allergen_severity.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
    console.log(process.env.ALLERGEN_PREFIX);
    patient.addAllergen({
      _id: this._idGenerator.generate(process.env.ALLERGEN_PREFIX!),
      allergen,
      severity,
    });

    await this._patientRepo.save(patient);
  }
}
