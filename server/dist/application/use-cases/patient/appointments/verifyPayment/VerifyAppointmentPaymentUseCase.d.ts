import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IVerifyAppointmentPaymentUseCase, VerifyAppointmentPaymentInput } from "#application/ports/use-cases/patient/appointments/IVerifyAppointmentPaymentUseCase.js";
export declare class VerifyAppointmentPaymentUseCase implements IVerifyAppointmentPaymentUseCase {
    private readonly _logger;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _appointmentRepo: IAppointmentRepository);
    execute(data: VerifyAppointmentPaymentInput): Promise<void>;
}
//# sourceMappingURL=VerifyAppointmentPaymentUseCase.d.ts.map