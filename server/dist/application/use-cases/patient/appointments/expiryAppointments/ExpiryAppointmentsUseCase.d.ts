import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IExpiryAppointmentsUseCase } from "#application/ports/use-cases/patient/appointments/IExpiryAppointmentsUseCase.js";
export declare class ExpiryAppointmentsUseCase implements IExpiryAppointmentsUseCase {
    private readonly _logger;
    private readonly _appointementRepo;
    constructor(_logger: ILogger, _appointementRepo: IAppointmentRepository);
    execute(): Promise<void>;
}
//# sourceMappingURL=ExpiryAppointmentsUseCase.d.ts.map