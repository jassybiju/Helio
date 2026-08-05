import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDeleteDoctorBlockSlotUseCase } from "#application/ports/use-cases/doctor/slot/IDeleteDoctorBlockSlotUseCase.js";
export declare class DeleteDoctorBlockSlotUseCase implements IDeleteDoctorBlockSlotUseCase {
    private readonly _logger;
    private readonly _blockSlotRepo;
    private readonly _doctorRepo;
    constructor(_logger: ILogger, _blockSlotRepo: IDoctorBlockShiftRepository, _doctorRepo: IDoctorRepository);
    execute(doctorId: string, blockId: string): Promise<void>;
}
//# sourceMappingURL=DeleteDoctorBlockSlotUseCase.d.ts.map