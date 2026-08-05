import type { PAYMENT_TYPE } from "#domain/common/enums/appointment.enum.js";
export interface ICheckoutAppointmentUseCase {
    execute(appointmentId: string, patientId: string, paymentType: PAYMENT_TYPE): Promise<{
        success: true;
    } | {
        orderId: string;
    }>;
}
//# sourceMappingURL=ICheckoutAppointmentUseCase.d.ts.map