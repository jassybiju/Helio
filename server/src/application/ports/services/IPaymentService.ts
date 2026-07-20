import type { Appointment } from "@domain/entities/Appointment.ts";

export interface IPaymentService {
  pay(data: {
    appointment: Appointment;
    patientId: string;
    amount: number;
  }): Promise<{ success: true } | { orderId: string }>;
}
