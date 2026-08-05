import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ISkipDoctorAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/ISkipDoctorAppointmentUseCase.js";
export declare class SkipDoctorAppointmentUseCase implements ISkipDoctorAppointmentUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _appointmentRepo: IAppointmentRepository);
    execute(doctorId: string, appointmentId: string): Promise<void>;
}
//# sourceMappingURL=SkipDoctorAppointmentUseCase.d.ts.map