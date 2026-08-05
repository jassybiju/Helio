import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetAllAppointmentsUseCase } from "#application/ports/use-cases/patient/appointments/IGetAllAppointmentsUsecase.js";
import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import type { IGetAllAppointmentsDTO } from "./IGetAllAppointmentsDTO.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class GetAllAppointmentUseCase implements IGetAllAppointmentsUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _appointmentRepo;
    private readonly _doctorRepo;
    private readonly _consultationRepo;
    private readonly _labRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _appointmentRepo: IAppointmentRepository, _doctorRepo: IDoctorRepository, _consultationRepo: IConsultationRepository, _labRepo: ILabReportRepository, _fileUpload: IFileUpload);
    execute(patientId: string, query: {
        page: number;
        limit: number;
        status?: APPOINTMENT_STATUS;
    }): Promise<IGetAllAppointmentsDTO>;
}
//# sourceMappingURL=GetAllAppointmentUseCase.d.ts.map