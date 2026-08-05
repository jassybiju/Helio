import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientUpdateProfilePictureUseCase } from "#application/ports/use-cases/patient/profile/IUpdateProfilePictureUseCase.js";
export declare class PatientUpdateProfilePictureUseCase implements IPatientUpdateProfilePictureUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _fileUpload: IFileUpload);
    execute(patientId: string, document: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
    }): Promise<void>;
}
//# sourceMappingURL=PatientUpdateProfilePictureUseCase.d.ts.map