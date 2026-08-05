export interface IGoogleAuthService {
    verifyCredentials(credentials: string): Promise<{
        googleId: string;
        email: string;
        name: string;
        picture: string;
    }>;
}
//# sourceMappingURL=IGoogleAuthService.d.ts.map