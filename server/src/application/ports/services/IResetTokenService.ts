import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export interface IResetTokenService {
  generate(
    userId: string,
    role: USER_ROLES,
    ttlSeconds: number
  ): Promise<string>;
  verify(token: string): Promise<{ userId: string; role: USER_ROLES } | null>;
  invalidate(token: string): Promise<void>;
}
