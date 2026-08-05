import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAddPatientConditionUseCase } from "#application/ports/use-cases/patient/profile/IAddPatientConditionUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class AddPatientConditionUseCase implements IAddPatientConditionUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _idGenerator: IIDGenerator
  ) {}
  async execute(patientId: string, condition: string): Promise<void> {
    this._logger.info("Add Condition Attempt", { patientId, condition });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    patient.addCondition({
      _id: this._idGenerator.generate(process.env.CONDITION_PREFIX!),
      condition,
    });

    await this._patientRepo.update(patient);
  }
}
