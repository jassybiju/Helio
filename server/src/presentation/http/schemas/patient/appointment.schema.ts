import { z } from "zod";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";

export const createPatientAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),

  startTime: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),

  consultationType: z.enum(CONSULTATION_TYPE, {
    error: () => ({ message: "Invalid consultation type" }),
  }),
});

export const checkoutSchema = z.object({
  params: z.object({
    appointmentId: z.string().min(1),
  }),
  body: z.object({
    type: z.enum(["WALLET", "RAZORPAY"]),
  }),
});

export const verifyPaymentSchema = z.object({
  params: z.object({
    appointmentId: z.string().min(1),
  }),
  body: z.object({
    razorpay_payment_id: z.string(),
    razorpay_order_id: z.string(),
    razorpay_signature: z.string(),
  }),
});

export const rescheduleAppointmentSchema = z.object({
  body: z.object({
    startTime: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date",
    }),

    consultationType: z.enum(CONSULTATION_TYPE, {
      error: () => ({ message: "Invalid consultation type" }),
    }),
  }),
});
