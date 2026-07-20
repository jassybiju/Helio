import { BOOKING_PERIOD } from "@domain/common/enums/appointment.enum.ts";
import z from "zod";

export const getAdminDashboardSchema = z.object({
  query: z.object({
    period: z.enum(BOOKING_PERIOD),
  }),
});
