import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import z from "zod";

export const adminAppointmentSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    status: z.enum(APPOINTMENT_STATUS).optional(),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 10)),
  }),
});
