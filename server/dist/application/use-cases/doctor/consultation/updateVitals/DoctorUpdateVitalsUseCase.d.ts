import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUpdateVitalsConsultationUseCase } from "#application/ports/use-cases/doctor/consultation/IUpdateVitalsConsultationUseCase.js";
export declare class DoctorUpdateVitalsUseCase implements IUpdateVitalsConsultationUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _consultationRepo;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _consultationRepo: IConsultationRepository, _appointmentRepo: IAppointmentRepository);
    execute(doctorId: string, appointmentId: string, data: {
        bloodPressure: string | null;
        oxygenLevel: number | null;
        heartRate: number | null;
        temperature: number | null;
        weight: number | null;
        height: number | null;
    }): Promise<void>;
}
//# sourceMappingURL=DoctorUpdateVitalsUseCase.d.ts.map