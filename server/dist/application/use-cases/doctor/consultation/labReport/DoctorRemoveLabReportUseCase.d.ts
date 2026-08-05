import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILabReportRepository } from "#application/ports/repositories/ILabReportRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IRemoveLabReportUseCase } from "#application/ports/use-cases/doctor/consultation/IRemoveLabReportUseCase.js";
export declare class DoctorRemoveLabReportUseCase implements IRemoveLabReportUseCase {
    private readonly _logger;
    private readonly _doctorRepo;
    private readonly _appointmentRepo;
    private readonly _labRepo;
    constructor(_logger: ILogger, _doctorRepo: IDoctorRepository, _appointmentRepo: IAppointmentRepository, _labRepo: ILabReportRepository);
    execute(doctorId: string, appointmentId: string, labId: string): Promise<void>;
}
//# sourceMappingURL=DoctorRemoveLabReportUseCase.d.ts.map