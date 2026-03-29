import type { IGetMeResponseDTO } from "@application/dto/auth/IGetMeDTO.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IGetMeHandler } from "@application/ports/use-cases/auth/IGetMeHandler.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { USER_ROLES } from "@shared/types/UserRoles.ts";

export class DoctorGetMeHandler implements IGetMeHandler {
  constructor(private readonly _doctorRepo: IDoctorRepository) {}

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

    return {
      id: doctor.id,
      email: doctor.email,
      role: USER_ROLES.DOCTOR,
      status: doctor.verificationStatus,
    };
  }
}
