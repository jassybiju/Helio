import type { IDoctorViewTodaysAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/IDoctorViewTodaysAppointmentUseCase.js";
import type { IDoctorViewTodaysAppointmentDTO } from "./IDoctorViewTodaysAppointmentDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
export declare class DoctorViewTodaysAppointmentUseCase implements IDoctorViewTodaysAppointmentUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _patientRepo;
    private readonly _appointmentRepo;
    private readonly _fileUpload;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _patientRepo: IPatientRepository, _appointmentRepo: IAppointmentRepository, _fileUpload: IFileUpload);
    execute(doctorId: string): Promise<IDoctorViewTodaysAppointmentDTO>;
}
//# sourceMappingURL=DoctorViewTodaysAppointmentUseCase.d.ts.map