import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetPatientProfileUseCase } from "@application/ports/use-cases/patient/profile/IGetPatientProfileUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { GetPatientProfileMapper } from "./GetPatientProfileMapper.ts";
import type { IGetPatientProfileDTO } from "./IGetPatientProfileDTO.ts";

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
      ? this._fileUpload.getFileUrl(patient.profilePicKey)
      : null;
    return GetPatientProfileMapper.toDto(patient, profilePic);
  }
}
