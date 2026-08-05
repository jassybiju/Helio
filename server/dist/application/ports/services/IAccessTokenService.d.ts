import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export interface IAccessTokenService {
    generateAccessToken(id: string, email: string, role: USER_ROLES): string;
}
//# sourceMappingURL=IAccessTokenService.d.ts.map