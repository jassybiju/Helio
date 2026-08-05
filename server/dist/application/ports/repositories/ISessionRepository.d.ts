import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export type SessionData = {
    userId: string;
    role: USER_ROLES;
    email: string;
};
export interface ISessionRepository {
    storeRefreshToken(userId: string, role: USER_ROLES, email: string, token: string): Promise<void>;
    getRefreshToken(hashedToken: string): Promise<SessionData | null>;
    deleteRefreshToken(hashedToken: string): Promise<void>;
}
//# sourceMappingURL=ISessionRepository.d.ts.map