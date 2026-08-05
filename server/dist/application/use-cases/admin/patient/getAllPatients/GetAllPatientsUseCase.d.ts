import type { IGetAllPatientsUseCase } from "#application/ports/use-cases/admin/patient/IGetAllPatientsUseCase.js";
import type { IGetAllPatientsRequestDTO, IGetAllPatientsResponseDTO } from "./IGetAllPatientsDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class GetAllPatientsUseCase implements IGetAllPatientsUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _fileUpload: IFileUpload);
    execute(input: IGetAllPatientsRequestDTO): Promise<IGetAllPatientsResponseDTO>;
}
//# sourceMappingURL=GetAllPatientsUseCase.d.ts.map