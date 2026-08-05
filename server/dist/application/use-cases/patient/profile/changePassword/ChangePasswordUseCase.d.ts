import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { IChangePatientPasswordUseCase } from "#application/ports/use-cases/patient/profile/IChangePatientPasswordUseCase.js";
import type { PatientValidator } from "#application/validators/PatientValidator.js";
export declare class ChangePasswordUseCase implements IChangePatientPasswordUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _passwordService;
    private readonly _patientValidator;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _passwordService: IPasswordService, _patientValidator: PatientValidator);
    execute(userId: string, oldPassword: string, newPassword: string): Promise<void>;
}
//# sourceMappingURL=ChangePasswordUseCase.d.ts.map