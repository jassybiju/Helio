import type { ILoginRequestDTO, ILoginResponseDTO } from "#application/dto/auth/ILoginDTO.js";
import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
import type { IAdminRepository } from "#application/ports/repositories/IAdminRepository.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
export declare class LoginAdminUseCase implements ILoginUseCase {
    private readonly _logger;
    private readonly _accessTokenService;
    private readonly _refreshTokenService;
    private readonly _adminRepo;
    private readonly _passwordService;
    private readonly _sessionRepo;
    constructor(_logger: ILogger, _accessTokenService: IAccessTokenService, _refreshTokenService: IRefreshTokenService, _adminRepo: IAdminRepository, _passwordService: IPasswordService, _sessionRepo: ISessionRepository);
    execute(input: ILoginRequestDTO): Promise<ILoginResponseDTO>;
}
//# sourceMappingURL=LoginAdminUseCase.d.ts.map