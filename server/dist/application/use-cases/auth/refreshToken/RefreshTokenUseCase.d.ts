import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { IRefreshTokenUseCase } from "#application/ports/use-cases/auth/IRefreshTokenUseCase.js";
export declare class RefreshTokenUseCase implements IRefreshTokenUseCase {
    private readonly _logger;
    private readonly _sessionRepo;
    private readonly _refreshTokenService;
    private readonly _accessTokenService;
    constructor(_logger: ILogger, _sessionRepo: ISessionRepository, _refreshTokenService: IRefreshTokenService, _accessTokenService: IAccessTokenService);
    execute(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=RefreshTokenUseCase.d.ts.map