import type { IGetRescheduledSlotsUseCase } from "#application/ports/use-cases/patient/appointments/cancellation/IGetRescheduledSlotsUseCase.js";
import type { IGetRescheduledSlotsDTO } from "./IGetRescheduledSlotsDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { ISlotGenerator } from "#application/ports/services/ISlotGenerator.js";
export declare class GetRescheduledSlotsUseCase implements IGetRescheduledSlotsUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _appointmentRepo;
    private readonly _doctorShiftRepo;
    private readonly _blockSlotRepo;
    private readonly _slotService;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _appointmentRepo: IAppointmentRepository, _doctorShiftRepo: IDoctorShiftRepository, _blockSlotRepo: IDoctorBlockShiftRepository, _slotService: ISlotGenerator);
    execute(patientId: string, appointmentId: string): Promise<IGetRescheduledSlotsDTO>;
    private isSlotBlocked;
    private getSlotStatus;
}
//# sourceMappingURL=GetRescheduledSlotsUseCase.d.ts.map