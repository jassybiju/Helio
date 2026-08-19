import type { IGetMeResponseDTO } from "#application/dto/auth/IGetMeDTO.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IGetMeHandler } from "#application/ports/use-cases/auth/IGetMeHandler.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";

export class PatientGetMeHandler implements IGetMeHandler {
  constructor(
    private readonly _patientRepo: IPatientRepository,
    private readonly _fileUpload: IFileUpload
  ) {}

  supports(role: USER_ROLES): boolean {
    return role === USER_ROLES.PATIENT;
  }

  async execute(id: string): Promise<IGetMeResponseDTO> {
    const patient = await this._patientRepo.findById(id);

    if (!patient) {
      throw new AppError("No Valid Credientals", HTTPStatus.UNAUTHORIZED);
    }

    if (patient.isBlocked) {
      throw new AppError("User is Blocked", HTTPStatus.FORBIDDEN);
    }

    const profilePic = patient.profilePicKey
      ? await this._fileUpload.getFileUrl(patient.profilePicKey)
      : null;

    return {
      id: patient.id,
      email: patient.email,
      role: USER_ROLES.PATIENT,
      isProfileComplete: patient.isProfileComplete(),
      profilePic,
    };
  }
}
