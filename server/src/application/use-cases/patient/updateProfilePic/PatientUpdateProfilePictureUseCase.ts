import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IPatientUpdateProfilePictureUseCase } from "@application/ports/use-cases/patient/profile/IUpdateProfilePictureUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";

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
