import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import z from "zod";
export const doctorViewAllAppointmentSchema = z.object({
    query: z.object({
        search: z.string().optional(),
        date: z
            .string()
            .optional()
            .transform((val) => (val ? new Date(val) : undefined)),
        page: z
            .string()
            .optional()
            .transform((val) => (val ? Number(val) : 1)),
        limit: z
            .string()
            .optional()
            .transform((val) => (val ? Number(val) : 10)),
        status: z.enum(APPOINTMENT_STATUS).optional(),
        type: z.enum(CONSULTATION_TYPE).optional(),
    }),
});
//# sourceMappingURL=appointment.schema.js.map