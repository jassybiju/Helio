import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRemovePatientConditionUseCase } from "#application/ports/use-cases/patient/profile/IRemovePatientConditionUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class RemovePatientConditionUseCase implements IRemovePatientConditionUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository
  ) {}
  async execute(patientId: string, conditionId: string): Promise<void> {
    this._logger.info("Patient Condition Remove attempt", {
      patientId,
      conditionId,
    });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    patient.removeCondition(conditionId);

    this._patientRepo.update(patient);
  }
}
