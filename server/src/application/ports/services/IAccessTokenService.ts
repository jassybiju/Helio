import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export interface IAccessTokenService {
  generateAccessToken(id: string, email: string, role: USER_ROLES): string;
}
