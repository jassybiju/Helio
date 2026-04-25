import z from "zod";

export const getAllDoctorSlotsSchema = z.object({
  dateFrom: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  dateTo: z
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
  sort: z.enum(["day", "time"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
