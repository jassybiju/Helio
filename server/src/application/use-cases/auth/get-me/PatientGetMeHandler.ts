import type { IGetMeResponseDTO } from "@application/dto/auth/IGetMeDTO.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IGetMeHandler } from "@application/ports/use-cases/auth/IGetMeHandler.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";

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
      ? this._fileUpload.getFileUrl(patient.profilePicKey)
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
