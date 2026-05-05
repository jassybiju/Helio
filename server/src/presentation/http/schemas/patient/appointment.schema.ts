import { z } from "zod";
import { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";

export const createPatientAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),

  startTime: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),

  consultationType: z.enum(CONSULTATION_TYPE, {
    error: () => ({ message: "Invalid consultation type" }),
  }),
});
