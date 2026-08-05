import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IResubmitVerificationUseCase } from "#application/ports/use-cases/doctor/verification/IResubmitVerificationUseCase.js";
export declare class ResubmitVerificationUseCase implements IResubmitVerificationUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _fileUpload: IFileUpload);
    execute(doctorId: string, input: {
        document: {
            buffer: Buffer;
            mimetype: string;
            originalname: string;
        };
        additionalInfo: string;
    }): Promise<void>;
}
//# sourceMappingURL=ResubmitVerificationUseCase.d.ts.map