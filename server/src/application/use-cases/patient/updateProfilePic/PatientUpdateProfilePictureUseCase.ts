import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientUpdateProfilePictureUseCase } from "#application/ports/use-cases/patient/profile/IUpdateProfilePictureUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";

export class PatientUpdateProfilePictureUseCase implements IPatientUpdateProfilePictureUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(
    patientId: string,
    document: { buffer: Buffer; mimetype: string; originalname: string }
  ): Promise<void> {
    this._logger.info("Patient Update Profile Pic", { patientId });

    const patient = await this._patientRepo.findById(patientId);
    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
    }

    const documentKey = await this._fileUpload.upload(document);

    patient.updateProfilePic(documentKey);

    await this._patientRepo.update(patient);
  }
}
