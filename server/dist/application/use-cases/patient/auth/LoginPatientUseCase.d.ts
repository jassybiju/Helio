import type { ILoginRequestDTO, ILoginResponseDTO } from "#application/dto/auth/ILoginDTO.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
import type { PatientValidator } from "#application/validators/PatientValidator.js";
export declare class LoginPatientUseCase implements ILoginUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _patientValidator;
    private readonly _accessTokenService;
    private readonly _refreshTokenService;
    private readonly _sessionRepo;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _patientValidator: PatientValidator, _accessTokenService: IAccessTokenService, _refreshTokenService: IRefreshTokenService, _sessionRepo: ISessionRepository);
    execute(input: ILoginRequestDTO): Promise<ILoginResponseDTO>;
}
//# sourceMappingURL=LoginPatientUseCase.d.ts.map