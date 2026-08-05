import type { IRespondPatientResheduleAppointmentInput, IRespondPatientResheduleAppointmentUseCase } from "#application/ports/use-cases/patient/appointments/cancellation/IRespondPatientResheduleAppointmentUseCase.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
export declare class RespondPatientResheduleAppointmentUseCase implements IRespondPatientResheduleAppointmentUseCase {
    private readonly _logger;
    private readonly _appointmentRepo;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _doctorShiftRepo;
    private readonly _idGenerator;
    private readonly _uow;
    constructor(_logger: ILogger, _appointmentRepo: IAppointmentRepository, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _doctorShiftRepo: IDoctorShiftRepository, _idGenerator: IIDGenerator, _uow: IUnitOfWork);
    execute(patientId: string, appointmentId: string, data: IRespondPatientResheduleAppointmentInput): Promise<void>;
}
//# sourceMappingURL=RespondPatientResheduleAppointmentUseCase.d.ts.map