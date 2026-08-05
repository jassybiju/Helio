import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPaymentServiceFactory } from "#application/ports/services/IPaymentServiceFactory.js";
import type { ICheckoutAppointmentUseCase } from "#application/ports/use-cases/patient/appointments/ICheckoutAppointmentUseCase.js";
import { type PAYMENT_TYPE } from "#domain/common/enums/appointment.enum.js";
export declare class CheckoutAppointmentUseCase implements ICheckoutAppointmentUseCase {
    private readonly _logger;
    private readonly _appointmentRepo;
    private readonly _paymentService;
    constructor(_logger: ILogger, _appointmentRepo: IAppointmentRepository, _paymentService: IPaymentServiceFactory);
    execute(appointmentId: string, patientId: string, paymentType: PAYMENT_TYPE): Promise<{
        success: true;
    } | {
        orderId: string;
    }>;
}
//# sourceMappingURL=CheckoutAppointmentUseCase.d.ts.map