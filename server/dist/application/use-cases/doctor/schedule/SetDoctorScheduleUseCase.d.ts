import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IDoctorScheduleInput, ISetDoctorScheduleUseCase } from "#application/ports/use-cases/doctor/schedule/ISetDoctorScheduleUseCase.js";
export declare class SetDoctorScheduleUseCase implements ISetDoctorScheduleUseCase {
    private readonly _logger;
    private readonly _uow;
    private readonly _doctorShiftRepo;
    private readonly _idGenerator;
    private readonly _doctorRepo;
    constructor(_logger: ILogger, _uow: IUnitOfWork, _doctorShiftRepo: IDoctorShiftRepository, _idGenerator: IIDGenerator, _doctorRepo: IDoctorRepository);
    execute(doctorId: string, input: IDoctorScheduleInput): Promise<void>;
}
//# sourceMappingURL=SetDoctorScheduleUseCase.d.ts.map