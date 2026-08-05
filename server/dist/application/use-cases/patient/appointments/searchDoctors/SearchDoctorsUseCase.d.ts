import type { ISearchDoctorsInput, ISearchDoctorUseCase } from "#application/ports/use-cases/patient/appointments/ISearchDoctorUseCase.js";
import type { ISearchDoctorsDTO } from "./ISearchDoctorDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ISlotGenerator } from "#application/ports/services/ISlotGenerator.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class SearchDoctorsUseCase implements ISearchDoctorUseCase {
    private readonly _logger;
    private readonly _shiftRepo;
    private readonly _doctorRepo;
    private readonly _slotGen;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _shiftRepo: IDoctorShiftRepository, _doctorRepo: IDoctorRepository, _slotGen: ISlotGenerator, _fileUpload: IFileUpload);
    execute(input: ISearchDoctorsInput): Promise<{
        data: ISearchDoctorsDTO[];
        totalCount: number;
    }>;
}
//# sourceMappingURL=SearchDoctorsUseCase.d.ts.map