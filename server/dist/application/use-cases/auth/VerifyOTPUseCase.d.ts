import type { IVerifyOtpRequestDTO, IVerifyOTPResponseDTO } from "#application/dto/auth/IOTPDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IOTPRepository } from "#application/ports/repositories/IOTPRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IVerifyOTPUseCase } from "#application/ports/use-cases/auth/IVerifyOTPUseCase.js";
export declare class VerifyOTPUseCase implements IVerifyOTPUseCase {
    private readonly _logger;
    private readonly _otpRepo;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _walletRepo;
    private readonly _idGenerator;
    constructor(_logger: ILogger, _otpRepo: IOTPRepository, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _walletRepo: IWalletRepository, _idGenerator: IIDGenerator);
    execute(input: IVerifyOtpRequestDTO): Promise<IVerifyOTPResponseDTO>;
}
//# sourceMappingURL=VerifyOTPUseCase.d.ts.map