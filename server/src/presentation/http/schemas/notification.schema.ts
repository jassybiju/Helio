import z from "zod";

export const getAllNotificationSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 1))
      .pipe(z.number().int().positive()),

    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 10))
      .pipe(z.number().int().positive()),
  }),
});
