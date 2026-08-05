import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDeleteDoctorScheduleUseCase } from "#application/ports/use-cases/doctor/schedule/IDeleteDoctorScheduleUseCase.js";
export declare class DeleteDoctorScheduleUseCase implements IDeleteDoctorScheduleUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _doctorShiftRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _doctorShiftRepo: IDoctorShiftRepository);
    execute(shiftId: string, doctorId: string): Promise<void>;
}
//# sourceMappingURL=DeleteDoctorScheduleUseCase.d.ts.map