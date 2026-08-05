import type { IRegisterPatientRequestDTO, IRegisterPatientResponseDTO } from "#application/dto/patient/auth/IRegisterPatientDTO.js";
import type { IOTPRepository } from "#application/ports/repositories/IOTPRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IEmailService } from "#application/ports/services/IEmailService.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IOTPService } from "#application/ports/services/IOTPService.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { IRegisterPatientUseCase } from "#application/ports/use-cases/patient/auth/IRegisterPatientUseCase.js";
import type { PatientValidator } from "#application/validators/PatientValidator.js";
export declare class RegisterPatientUseCase implements IRegisterPatientUseCase {
    private readonly _patientValidator;
    private readonly _patientRepo;
    private readonly _passwordService;
    private readonly _idGenerator;
    private readonly _logger;
    private readonly _otpService;
    private readonly _otpRepo;
    private readonly _emailService;
    constructor(_patientValidator: PatientValidator, _patientRepo: IPatientRepository, _passwordService: IPasswordService, _idGenerator: IIDGenerator, _logger: ILogger, _otpService: IOTPService, _otpRepo: IOTPRepository, _emailService: IEmailService);
    execute(input: IRegisterPatientRequestDTO): Promise<IRegisterPatientResponseDTO>;
}
//# sourceMappingURL=RegisterPatientUseCase.d.ts.map