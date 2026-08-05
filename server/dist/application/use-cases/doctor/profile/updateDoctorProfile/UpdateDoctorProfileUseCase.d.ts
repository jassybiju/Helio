import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUpdateDoctorInput, IUpdateDoctorProfileUseCase } from "#application/ports/use-cases/doctor/profile/IUpdateDoctorProfileUseCase.js";
export declare class UpdateDoctorProfileUseCase implements IUpdateDoctorProfileUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository);
    execute(input: IUpdateDoctorInput): Promise<void>;
}
//# sourceMappingURL=UpdateDoctorProfileUseCase.d.ts.map