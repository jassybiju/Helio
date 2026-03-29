import type { IGetMeResponseDTO } from "@application/dto/auth/IGetMeDTO.ts";
import type { IGetMeHandler } from "@application/ports/use-cases/auth/IGetMeHandler.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { USER_ROLES } from "@shared/types/UserRoles.ts";

export class AdminGetMeHandler implements IGetMeHandler {
  constructor() {}

  supports(role: USER_ROLES): boolean {
    return role === USER_ROLES.ADMIN;
  }

  async execute(id: string): Promise<IGetMeResponseDTO> {
    const ADMIN_ID = process.env.ADMIN_ID!;

    if (id !== ADMIN_ID) {
      throw new AppError("No Valid Credientals", HTTPStatus.UNAUTHORIZED);
    }

    return {
      id: process.env.ADMIN_ID!,
      email: process.env.ADMIN_EMAIL!,
      role: USER_ROLES.ADMIN,
    };
  }
}
