import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
export declare class JWTAccessTokenService implements IAccessTokenService {
    generateAccessToken(id: string, email: string, role: "doctor" | "patient" | "admin"): string;
}
//# sourceMappingURL=JWTAccessTokenService.d.ts.map