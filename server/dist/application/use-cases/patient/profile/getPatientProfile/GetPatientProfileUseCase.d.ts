import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetPatientProfileUseCase } from "#application/ports/use-cases/patient/profile/IGetPatientProfileUseCase.js";
import type { IGetPatientProfileDTO } from "./IGetPatientProfileDTO.js";
export declare class GetPatientProfileUseCase implements IGetPatientProfileUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _fileUpload: IFileUpload);
    execute(patientId: string): Promise<IGetPatientProfileDTO>;
}
//# sourceMappingURL=GetPatientProfileUseCase.d.ts.map