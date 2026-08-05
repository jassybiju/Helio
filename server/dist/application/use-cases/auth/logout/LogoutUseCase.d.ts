import type { ILogoutUseCase } from "#application/ports/use-cases/auth/ILogoutUseCase.js";
import type { ILogoutRequestDTO } from "./ILogoutDto.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
export declare class LogoutUseCase implements ILogoutUseCase {
    private readonly _logger;
    private readonly _refreshTokenService;
    private readonly _sessionRepo;
    constructor(_logger: ILogger, _refreshTokenService: IRefreshTokenService, _sessionRepo: ISessionRepository);
    execute(input: ILogoutRequestDTO): Promise<void>;
}
//# sourceMappingURL=LogoutUseCase.d.ts.map