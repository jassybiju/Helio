import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRemovePrescriptionUseCase } from "#application/ports/use-cases/doctor/consultation/IRemovePrescriptionUseCase.js";
export declare class DoctorRemovePrescriptionUseCase implements IRemovePrescriptionUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _consultationRepo;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _consultationRepo: IConsultationRepository, _appointmentRepo: IAppointmentRepository);
    execute(doctorId: string, appointmentId: string, prescriptionName: string): Promise<void>;
}
//# sourceMappingURL=DoctorRemovePrescriptionUseCase.d.ts.map