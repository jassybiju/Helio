import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IPatientRescheduleUseCase, IPatientResheduleAppointmentInput } from "#application/ports/use-cases/patient/appointments/cancellation/IPatientRescheduleUseCase.js";
export declare class PatientRescheduleAppointmentUseCase implements IPatientRescheduleUseCase {
    private readonly _logger;
    private readonly _appointmentRepo;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _doctorShiftRepo;
    private readonly _idGenerator;
    private readonly _uow;
    constructor(_logger: ILogger, _appointmentRepo: IAppointmentRepository, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _doctorShiftRepo: IDoctorShiftRepository, _idGenerator: IIDGenerator, _uow: IUnitOfWork);
    execute(patientId: string, appointmentId: string, data: IPatientResheduleAppointmentInput): Promise<void>;
}
//# sourceMappingURL=PatientRescheduleAppointmentUseCase.d.ts.map