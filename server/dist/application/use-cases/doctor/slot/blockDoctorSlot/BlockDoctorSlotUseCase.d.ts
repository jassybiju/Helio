import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { INotificationService } from "#application/ports/services/INotificationService.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IBlockDoctorInput, IBlockDoctorSlotUseCase } from "#application/ports/use-cases/doctor/slot/IBlockDoctorSlotUseCase.js";
export declare class BlockDoctorSlotUseCase implements IBlockDoctorSlotUseCase {
    private readonly _logger;
    private readonly _idGenerator;
    private readonly _blockShiftRepo;
    private readonly _appointmentRepo;
    private readonly _uow;
    private readonly _notificationService;
    constructor(_logger: ILogger, _idGenerator: IIDGenerator, _blockShiftRepo: IDoctorBlockShiftRepository, _appointmentRepo: IAppointmentRepository, _uow: IUnitOfWork, _notificationService: INotificationService);
    execute(doctorId: string, input: IBlockDoctorInput): Promise<{
        blocked: boolean;
        blockDetails: unknown;
        reason: string;
        appointments: unknown;
    } | {
        blocked: true;
    }>;
}
//# sourceMappingURL=BlockDoctorSlotUseCase.d.ts.map