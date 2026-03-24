import type { USER_ROLES } from "@shared/types/UserRoles.ts";

export interface IAccessTokenService {
  generateAccessToken(id: string, email: string, role: USER_ROLES): string;
}
