import type { IPaymentService } from "@application/ports/services/IPaymentService.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";

export class RazorpayPaymentService implements IPaymentService {
  pay(data: {
    appointment: Appointment;
    patientId: string;
    amount: number;
  }): Promise<{ success: true } | { orderId: string }> {
    throw new Error("Implement It");
  }
}
