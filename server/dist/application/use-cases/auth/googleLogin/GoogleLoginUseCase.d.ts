import type { IGoogleLoginResponseDTO } from "#application/dto/auth/IGoogleLoginDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
import type { IGoogleAuthService } from "#application/ports/services/IGoogleAuthService.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { IGoogleLoginUseCase } from "#application/ports/use-cases/auth/IGoogleLoginUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export declare class GoogleLoginUseCase implements IGoogleLoginUseCase {
    private readonly _logger;
    private readonly _googleAuthService;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _idGenerator;
    private readonly _accessTokenService;
    private readonly _refreshTokenService;
    private readonly _sessionRepo;
    private readonly _walletRepo;
    constructor(_logger: ILogger, _googleAuthService: IGoogleAuthService, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _idGenerator: IIDGenerator, _accessTokenService: IAccessTokenService, _refreshTokenService: IRefreshTokenService, _sessionRepo: ISessionRepository, _walletRepo: IWalletRepository);
    execute({ credentials, role, }: {
        credentials: string;
        role: USER_ROLES;
    }): Promise<IGoogleLoginResponseDTO>;
}
//# sourceMappingURL=GoogleLoginUseCase.d.ts.map