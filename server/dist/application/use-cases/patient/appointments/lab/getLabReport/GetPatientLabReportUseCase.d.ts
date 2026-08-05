import type { IGetPatientLabReportUseCase } from "#application/ports/use-cases/patient/appointments/IGetPatientLabReportUseCase.js";
import type { IGetPatientLabReportsDTO } from "./IGetPatientLabReportDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class GetPatientLabReportUseCase implements IGetPatientLabReportUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _labRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _labRepo: ILabReportRepository, _fileUpload: IFileUpload);
    execute(patientId: string, data: {
        page: number;
        limit: number;
    }): Promise<IGetPatientLabReportsDTO>;
}
//# sourceMappingURL=GetPatientLabReportUseCase.d.ts.map