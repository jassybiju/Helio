import type { IPaymentService } from "#application/ports/services/IPaymentService.js";
import type { Appointment } from "#domain/entities/Appointment.js";
import type Razorpay from "razorpay";

export class RazorpayPaymentService implements IPaymentService {
  constructor(private readonly _razorpay: Razorpay) {}
  async pay(data: {
    appointment: Appointment;
    patientId: string;
    amount: number;
  }): Promise<
    { success: true } | { orderId: string; amount: number; currency: "INR" }
  > {
    try {
      const order = await this._razorpay.orders.create({
        amount: Math.round(data.amount * 100),
        currency: "INR",
        receipt: data.appointment.id,
      });

      return {
        orderId: order.id,
        amount: data.amount,
        currency: "INR",
      };
    } catch (err) {
      console.dir(err, { depth: null });
      throw err;
    }
  }
}
