import type { IPaymentService } from "#application/ports/services/IPaymentService.js";
import type { Appointment } from "#domain/entities/Appointment.js";
import type Razorpay from "razorpay";
export declare class RazorpayPaymentService implements IPaymentService {
    private readonly _razorpay;
    constructor(_razorpay: Razorpay);
    pay(data: {
        appointment: Appointment;
        patientId: string;
        amount: number;
    }): Promise<{
        success: true;
    } | {
        orderId: string;
        amount: number;
        currency: "INR";
    }>;
}
//# sourceMappingURL=RazorpayPaymentService.d.ts.map