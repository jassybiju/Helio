export interface IRefreshTokenUseCase {
    execute(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=IRefreshTokenUseCase.d.ts.map