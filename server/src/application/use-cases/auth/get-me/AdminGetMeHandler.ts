import type { IGetMeResponseDTO } from "#application/dto/auth/IGetMeDTO.js";
import type { IGetMeHandler } from "#application/ports/use-cases/auth/IGetMeHandler.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IAdminRepository } from "#application/ports/repositories/IAdminRepository.js";

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
