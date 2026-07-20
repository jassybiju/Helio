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

export const blockDoctorSlotSchema = z
  .object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    reason: z.string(),
    force: z.boolean().optional(),
  })
  .refine(
    (data) => {
      return data.endTime > data.startTime;
    },
    {
      message: "endTime must be greater than startTime",
      path: ["endTime"],
    }
  );
