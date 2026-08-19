import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetDoctorProfileUseCase } from "#application/ports/use-cases/doctor/profile/IGetDoctorProfileUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { GetDoctorProfileMapper } from "./GetDoctorProfileMapper.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";

export class GetDoctorProfileUseCase implements IGetDoctorProfileUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(doctorId: string): Promise<{
    id: string;
    fullName: string;
    email: string;
    specialization: string | null;
    bio: string | null;
    yearsOfExperience: number | null;
    onlineFee: number | null;
    clinicFee: number | null;
    profilePic: string | null;
  }> {
    this._logger.info("Get Doctor Profile attempt", { doctorId });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const profilePic = doctor.profilePicKey
      ? await this._fileUpload.getFileUrl(doctor.profilePicKey)
      : null;
    return GetDoctorProfileMapper.toDto(doctor, profilePic);
  }
}
