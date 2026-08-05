import type { ILoginRequestDTO, ILoginResponseDTO } from "#application/dto/auth/ILoginDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ISessionRepository } from "#application/ports/repositories/ISessionRepository.js";
import type { IAccessTokenService } from "#application/ports/services/IAccessTokenService.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
import { DoctorValidator } from "#application/validators/DoctorValidator.js";
export declare class LoginDoctorUseCase implements ILoginUseCase {
    private readonly _loggerService;
    private readonly _doctorRepo;
    private readonly _doctorValidator;
    private readonly _accessTokenService;
    private readonly _refreshTokenService;
    private readonly _sessionService;
    constructor(_loggerService: ILogger, _doctorRepo: IDoctorRepository, _doctorValidator: DoctorValidator, _accessTokenService: IAccessTokenService, _refreshTokenService: IRefreshTokenService, _sessionService: ISessionRepository);
    execute(input: ILoginRequestDTO): Promise<ILoginResponseDTO>;
}
//# sourceMappingURL=LoginDoctorUseCase.d.ts.map