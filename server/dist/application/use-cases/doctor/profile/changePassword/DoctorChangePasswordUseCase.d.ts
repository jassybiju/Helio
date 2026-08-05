import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { IChangeDoctorPasswordUseCase } from "#application/ports/use-cases/doctor/profile/IChangeDoctorPasswordUseCase.js";
import type { DoctorValidator } from "#application/validators/DoctorValidator.js";
export declare class ChangeDoctorPasswordUseCase implements IChangeDoctorPasswordUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _passwordService;
    private readonly _doctorValidator;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _passwordService: IPasswordService, _doctorValidator: DoctorValidator);
    execute(userId: string, oldPassword: string, newPassword: string): Promise<void>;
}
//# sourceMappingURL=DoctorChangePasswordUseCase.d.ts.map