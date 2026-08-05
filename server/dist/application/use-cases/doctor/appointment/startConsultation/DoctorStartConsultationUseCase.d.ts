import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IDoctorStartConsultationUseCase } from "#application/ports/use-cases/doctor/appointment/IDoctorStartConsultationUseCase.js";
export declare class DoctorStartConsultationUseCase implements IDoctorStartConsultationUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _appointmentRepo;
    private readonly _consultationRepo;
    private readonly _idGenerator;
    private readonly _uow;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _appointmentRepo: IAppointmentRepository, _consultationRepo: IConsultationRepository, _idGenerator: IIDGenerator, _uow: IUnitOfWork);
    execute(doctorId: string, appointmentId: string): Promise<{
        consultationId: string;
    }>;
}
//# sourceMappingURL=DoctorStartConsultationUseCase.d.ts.map