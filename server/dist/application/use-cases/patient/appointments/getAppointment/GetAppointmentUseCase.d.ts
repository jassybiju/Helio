import type { IGetAppointmentUseCase } from "#application/ports/use-cases/patient/appointments/IGetAppointmentUseCase.js";
import type { IGetAppointmentDTO } from "./IGetAppointmentDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
export declare class GetAppointmentUseCase implements IGetAppointmentUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _appointmentRepo;
    private readonly _consultationRepo;
    private readonly _doctorRepo;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _appointmentRepo: IAppointmentRepository, _consultationRepo: IConsultationRepository, _doctorRepo: IDoctorRepository);
    execute(patientId: string, appointmentId: string): Promise<IGetAppointmentDTO>;
}
//# sourceMappingURL=GetAppointmentUseCase.d.ts.map