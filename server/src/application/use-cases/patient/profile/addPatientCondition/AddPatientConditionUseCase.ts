import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IAddPatientConditionUseCase } from "@application/ports/use-cases/patient/profile/IAddPatientConditionUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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

    console.log(patient, 123);
    await this._patientRepo.update(patient);

    console.log(await this._patientRepo.findById(patientId));
  }
}
