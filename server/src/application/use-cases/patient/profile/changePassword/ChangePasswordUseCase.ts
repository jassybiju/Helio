import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { IChangePatientPasswordUseCase } from "#application/ports/use-cases/patient/profile/IChangePatientPasswordUseCase.js";
import type { PatientValidator } from "#application/validators/PatientValidator.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class ChangePasswordUseCase implements IChangePatientPasswordUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _passwordService: IPasswordService,
    private readonly _patientValidator: PatientValidator
  ) {}
  async execute(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    this._logger.info("Change Password Patient attempt", {
      userId,
      oldPassword,
      newPassword,
    });

    const patient = await this._patientRepo.findById(userId);
    if (!patient) {
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    await this._patientValidator.validatePatientPassword(patient, oldPassword);

    patient.updatePassword(await this._passwordService.hash(newPassword));

    this._patientRepo.update(patient);
  }
}
