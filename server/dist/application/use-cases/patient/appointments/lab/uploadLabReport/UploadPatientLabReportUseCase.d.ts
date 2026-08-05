import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUploadPatientLabReportUseCase } from "#application/ports/use-cases/patient/appointments/IUploadPatientLabReportUseCase.js";
export declare class UploadPatientLabReportUseCase implements IUploadPatientLabReportUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _labRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _labRepo: ILabReportRepository, _fileUpload: IFileUpload);
    execute(patientId: string, reportId: string, document: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
    }): Promise<void>;
}
//# sourceMappingURL=UploadPatientLabReportUseCase.d.ts.map