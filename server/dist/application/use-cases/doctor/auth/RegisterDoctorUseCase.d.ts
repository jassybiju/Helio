import type { IRegisterDoctorRequestDTO, IRegisterDoctorReponseDTO } from "#application/dto/doctor/auth/IRegisterDoctorDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IOTPRepository } from "#application/ports/repositories/IOTPRepository.js";
import type { IEmailService } from "#application/ports/services/IEmailService.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IOTPService } from "#application/ports/services/IOTPService.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { IRegisterDoctorUseCase } from "#application/ports/use-cases/doctor/auth/IRegisterDoctorUseCase.js";
import type { DoctorValidator } from "#application/validators/DoctorValidator.js";
export declare class RegisterDoctorUseCase implements IRegisterDoctorUseCase {
    private readonly _logger;
    private readonly _doctorValidator;
    private readonly _idGenerator;
    private readonly _passwordService;
    private readonly _fileUpload;
    private readonly _doctorRepo;
    private readonly _otpRepo;
    private readonly _otpService;
    private readonly _emailService;
    constructor(_logger: ILogger, _doctorValidator: DoctorValidator, _idGenerator: IIDGenerator, _passwordService: IPasswordService, _fileUpload: IFileUpload, _doctorRepo: IDoctorRepository, _otpRepo: IOTPRepository, _otpService: IOTPService, _emailService: IEmailService);
    execute(input: IRegisterDoctorRequestDTO): Promise<IRegisterDoctorReponseDTO>;
}
//# sourceMappingURL=RegisterDoctorUseCase.d.ts.map