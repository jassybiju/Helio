import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetPatientProfileUseCase } from "#application/ports/use-cases/patient/profile/IGetPatientProfileUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { GetPatientProfileMapper } from "./GetPatientProfileMapper.js";
import type { IGetPatientProfileDTO } from "./IGetPatientProfileDTO.js";

export class GetPatientProfileUseCase implements IGetPatientProfileUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(patientId: string): Promise<IGetPatientProfileDTO> {
    this._logger.info("Get Patient Profile Attempt", { patientId });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const profilePic = patient.profilePicKey
      ? await this._fileUpload.getFileUrl(patient.profilePicKey)
      : null;
    return GetPatientProfileMapper.toDto(patient, profilePic);
  }
}
