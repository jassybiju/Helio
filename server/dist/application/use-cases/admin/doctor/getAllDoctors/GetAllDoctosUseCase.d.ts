import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetAllDoctorsUseCase } from "#application/ports/use-cases/admin/doctor/IGetAllDoctorsUseCase.js";
import type { IGetAllDoctorsRequestDTO, IGetAllDoctorsResponseDTO } from "./IGetAllDoctorsDTO.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class GetAllDoctorUseCase implements IGetAllDoctorsUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _fileUpload: IFileUpload);
    execute(input: IGetAllDoctorsRequestDTO): Promise<IGetAllDoctorsResponseDTO>;
}
//# sourceMappingURL=GetAllDoctosUseCase.d.ts.map