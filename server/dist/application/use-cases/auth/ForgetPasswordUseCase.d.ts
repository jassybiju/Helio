import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IMessageQueue } from "#application/ports/services/IMessageQueue.js";
import type { IResetTokenService } from "#application/ports/services/IResetTokenService.js";
import type { IForgetPasswordUseCase } from "#application/ports/use-cases/auth/IForgetPasswordUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export declare class ForgetPasswordUseCase implements IForgetPasswordUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _resetTokenService;
    private readonly _messageQueue;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _resetTokenService: IResetTokenService, _messageQueue: IMessageQueue);
    execute({ email, role, }: {
        email: string;
        role: USER_ROLES;
    }): Promise<void>;
}
//# sourceMappingURL=ForgetPasswordUseCase.d.ts.map