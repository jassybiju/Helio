import type { IGetPatientDashboardUseCase } from "#application/ports/use-cases/patient/dashboard/IGetPatientDashboardUseCase.js";
import type { IGetPatientDashboardDTO } from "./IGetPatientDashboardDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
export declare class GetPatientDashboardUseCase implements IGetPatientDashboardUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _appointmentRepo: IAppointmentRepository);
    execute(patientId: string): Promise<IGetPatientDashboardDTO>;
}
//# sourceMappingURL=GetPatientDashboardUseCase.d.ts.map