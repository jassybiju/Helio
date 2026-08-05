import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAddLabReportUseCase } from "#application/ports/use-cases/doctor/consultation/IAddLabReportUseCase.js";
export declare class DoctorAddLabReportUseCase implements IAddLabReportUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _appointmentRepo;
    private readonly _consultationRepo;
    private readonly _labRepo;
    private readonly _idGenerator;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _appointmentRepo: IAppointmentRepository, _consultationRepo: IConsultationRepository, _labRepo: ILabReportRepository, _idGenerator: IIDGenerator);
    execute(doctorId: string, appointmentId: string, input: {
        testName: string;
        instructions: string;
    }): Promise<void>;
}
//# sourceMappingURL=DoctorAddLabReportUseCase.d.ts.map