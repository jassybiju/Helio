import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorViewAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/IDoctorViewAppointmentUseCase.js";
import type { IDoctorViewAppointmentDTO } from "./IDoctorViewAppointmentDTO.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
export declare class DoctorViewAppointmentUseCase implements IDoctorViewAppointmentUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _appointmentRepo;
    private readonly _patientRepo;
    private readonly _consultationRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _appointmentRepo: IAppointmentRepository, _patientRepo: IPatientRepository, _consultationRepo: IConsultationRepository);
    execute(doctorId: string, appointmentId: string): Promise<IDoctorViewAppointmentDTO>;
}
//# sourceMappingURL=DoctorViewAppointmentUseCase.d.ts.map