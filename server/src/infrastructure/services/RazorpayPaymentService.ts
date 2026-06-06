import type { IPaymentService } from "@application/ports/services/IPaymentService.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";
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
    console.log(this._razorpay);
    const order = await this._razorpay.orders.create({
      amount: data.amount * 100,
      currency: "INR",
      receipt: data.appointment.id,
    });

    return { orderId: order.id, amount: data.amount, currency: "INR" };
  }
}
