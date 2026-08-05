import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { IResetTokenService } from "#application/ports/services/IResetTokenService.js";
import type { IResetPasswordUseCase } from "#application/ports/use-cases/auth/IResetPasswordUseCase.js";
export declare class ResetPasswordUseCase implements IResetPasswordUseCase {
    private readonly _logger;
    private readonly _resetTokenService;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _passwordService;
    constructor(_logger: ILogger, _resetTokenService: IResetTokenService, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _passwordService: IPasswordService);
    execute({ token, newPassword, }: {
        token: string;
        newPassword: string;
    }): Promise<void>;
}
//# sourceMappingURL=ResetPasswordUseCase.d.ts.map