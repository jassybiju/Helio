import type { IGoogleAuthService } from "#application/ports/services/IGoogleAuthService.js";
export declare class GoogleAuthService implements IGoogleAuthService {
    private _client;
    constructor();
    verifyCredentials(credentials: string): Promise<{
        googleId: string;
        email: string;
        name: string;
        picture: string;
    }>;
}
//# sourceMappingURL=GoogleAuthService.d.ts.map