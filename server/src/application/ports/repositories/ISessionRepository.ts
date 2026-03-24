import type { USER_ROLES } from "@shared/types/UserRoles.ts";

export interface ISessionRepository {
  storeRefreshToken(
    userId: string,
    role: USER_ROLES,
    token: string
  ): Promise<void>;
  getRefreshToken(userId: string, role: USER_ROLES): Promise<string | null>;
  deleteRefreshToken(userId: string, role: USER_ROLES): Promise<void>;
}
