import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorSlotFilters } from "#application/ports/repositories/IDoctorSlotRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetDoctorWeeklySlotsUseCase } from "#application/ports/use-cases/doctor/slot/IGetDoctorWeeklySlotsUseCase.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { ISlotGenerator } from "#application/ports/services/ISlotGenerator.js";
import type { DoctorSlot } from "#domain/value-objects/DoctorSlot.js";
import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
type SlotWithUnits = DoctorSlot;
export declare class GetDoctorWeeklySlotsUsecase implements IGetDoctorWeeklySlotsUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _doctorShiftRepo;
    private readonly _slotService;
    private readonly _blockSlotRepo;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _doctorShiftRepo: IDoctorShiftRepository, _slotService: ISlotGenerator, _blockSlotRepo: IDoctorBlockShiftRepository, _appointmentRepo: IAppointmentRepository);
    execute(doctorId: string, _params: IDoctorSlotFilters): Promise<Record<string, SlotWithUnits[]>>;
    private isSlotBlocked;
}
export {};
//# sourceMappingURL=GetDoctorWeeklySlotsUseCase.d.ts.map