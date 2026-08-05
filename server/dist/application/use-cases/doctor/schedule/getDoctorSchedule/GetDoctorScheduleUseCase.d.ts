import type { IGetDoctorScheduleUseCase } from "#application/ports/use-cases/doctor/schedule/IGetDoctorScheduleUseCase.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { DoctorShift } from "#domain/entities/DoctorShift.js";
export declare class GetDoctorScheduleUseCase implements IGetDoctorScheduleUseCase {
    private readonly _logger;
    private readonly _doctorShiftRepo;
    constructor(_logger: ILogger, _doctorShiftRepo: IDoctorShiftRepository);
    execute(doctorId: string): Promise<DoctorShift[]>;
}
//# sourceMappingURL=GetDoctorScheduleUseCase.d.ts.map