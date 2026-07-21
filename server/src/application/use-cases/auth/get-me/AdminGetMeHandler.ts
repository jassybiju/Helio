import type { IGetMeResponseDTO } from "@application/dto/auth/IGetMeDTO.ts";
import type { IGetMeHandler } from "@application/ports/use-cases/auth/IGetMeHandler.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import type { IAdminRepository } from "@application/ports/repositories/IAdminRepository.ts";

export class AdminGetMeHandler implements IGetMeHandler {
  constructor(private readonly _adminRepo: IAdminRepository) {}

  supports(role: USER_ROLES): boolean {
    return role === USER_ROLES.ADMIN;
  }

  async execute(id: string): Promise<IGetMeResponseDTO> {
    const admin = await this._adminRepo.findById(id);
    if (!admin) {
      throw new AppError("No Valid Credientals", HTTPStatus.UNAUTHORIZED);
    }

    return {
      id: admin.id,
      email: admin.email.value,
      role: USER_ROLES.ADMIN,
      isProfileComplete: true,
      profilePic: null,
    };
  }
}
