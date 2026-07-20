import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetDoctorProfileUseCase } from "@application/ports/use-cases/doctor/profile/IGetDoctorProfileUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { GetDoctorProfileMapper } from "./GetDoctorProfileMapper.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";

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
      ? this._fileUpload.getFileUrl(doctor.profilePicKey)
      : null;
    return GetDoctorProfileMapper.toDto(doctor, profilePic);
  }
}
