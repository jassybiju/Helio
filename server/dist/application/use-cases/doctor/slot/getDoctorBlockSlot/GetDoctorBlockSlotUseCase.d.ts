import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetDoctorBlockSlotUseCase } from "#application/ports/use-cases/doctor/slot/IGetDoctorBlockSlotUseCase.js";
import type { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
export declare class GetDoctorBlockSlotUseCase implements IGetDoctorBlockSlotUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _doctorBlockShiftRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _doctorBlockShiftRepo: IDoctorBlockShiftRepository);
    execute(doctorId: string): Promise<DoctorBlockShift[]>;
}
//# sourceMappingURL=GetDoctorBlockSlotUseCase.d.ts.map