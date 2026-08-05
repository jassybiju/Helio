import type { IGetMeResponseDTO } from "#application/dto/auth/IGetMeDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IGetMeHandler } from "#application/ports/use-cases/auth/IGetMeHandler.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";

export class DoctorGetMeHandler implements IGetMeHandler {
  constructor(
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _fileUpload: IFileUpload
  ) {}

  supports(role: USER_ROLES): boolean {
    return role === USER_ROLES.DOCTOR;
  }

  async execute(id: string): Promise<IGetMeResponseDTO> {
    const doctor = await this._doctorRepo.findById(id);
    if (!doctor) {
      throw new AppError("No Valid Credientals", HTTPStatus.UNAUTHORIZED);
    }

    if (doctor.isBlocked) {
      throw new AppError("User is Blocked", HTTPStatus.FORBIDDEN);
    }

    const profilePic = doctor.profilePicKey
      ? this._fileUpload.getFileUrl(doctor.profilePicKey)
      : null;

    return {
      id: doctor.id,
      email: doctor.email,
      role: USER_ROLES.DOCTOR,
      status: doctor.verificationStatus,
      isProfileComplete: doctor.isProfileComplete(),
      profilePic,
    };
  }
}
