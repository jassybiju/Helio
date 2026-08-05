import type { ICreateAppointmentInput, ICreateAppointmentUseCase } from "#application/ports/use-cases/patient/appointments/ICreateAppointmentUseCase.js";
import type { ICreateAppointmentDTO } from "./ICreateAppointmentDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { INotificationService } from "#application/ports/services/INotificationService.js";
export declare class CreateAppointmentUseCase implements ICreateAppointmentUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _doctorShiftRepo;
    private readonly _appointmentRepo;
    private readonly _idGenerator;
    private readonly _notificationService;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _doctorShiftRepo: IDoctorShiftRepository, _appointmentRepo: IAppointmentRepository, _idGenerator: IIDGenerator, _notificationService: INotificationService);
    execute(patientId: string, data: ICreateAppointmentInput): Promise<ICreateAppointmentDTO>;
}
//# sourceMappingURL=CreateAppointmentUseCase.d.ts.map