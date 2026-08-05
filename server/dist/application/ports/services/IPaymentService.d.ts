import type { Appointment } from "#domain/entities/Appointment.js";
export interface IPaymentService {
    pay(data: {
        appointment: Appointment;
        patientId: string;
        amount: number;
    }): Promise<{
        success: true;
    } | {
        orderId: string;
    }>;
}
//# sourceMappingURL=IPaymentService.d.ts.map