import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorViewConsultationUseCase } from "#application/ports/use-cases/doctor/consultation/IDoctorViewConsultationUseCase.js";
import type { IDoctorViewConsultationDTO } from "./IDoctorViewConsultationDTO.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
export declare class DoctorViewConsultationUseCase implements IDoctorViewConsultationUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _patientRepo;
    private readonly _consultationRepo;
    private readonly _appointmentRepo;
    private readonly _labRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _patientRepo: IPatientRepository, _consultationRepo: IConsultationRepository, _appointmentRepo: IAppointmentRepository, _labRepo: ILabReportRepository);
    execute(doctorId: string, appointmentId: string): Promise<IDoctorViewConsultationDTO>;
}
//# sourceMappingURL=DoctorViewConsultationUseCase.d.ts.map