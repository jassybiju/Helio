import z from "zod";

export const getAllPatientsSchema = z.object({
  search: z.string().optional(),
  isBlocked: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : val === "true")),
  isVerified: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : val === "true")),
  createdFrom: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  createdTo: z
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
  sortBy: z.enum(["createdAt", "firstName"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
