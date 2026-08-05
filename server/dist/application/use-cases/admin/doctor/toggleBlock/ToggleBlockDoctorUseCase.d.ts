import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IToggleBlockDoctorUseCase } from "#application/ports/use-cases/admin/doctor/IToggleBlockDoctorUseCase.js";
export declare class ToggleBlockDoctorUseCase implements IToggleBlockDoctorUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository);
    execute(userId: string): Promise<void>;
}
//# sourceMappingURL=ToggleBlockDoctorUseCase.d.ts.map