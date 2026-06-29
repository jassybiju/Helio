import { z } from "zod";

export const patientSearchDoctorSchema = z.object({
  name: z.string().optional(),

  specialization: z.string().optional(),

  location: z.string().min(1).optional(),

  consultationType: z.enum(["ONLINE", "CLINIC"]).optional(),

  minFee: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Invalid minFee" })
    .optional(),

  maxFee: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Invalid maxFee" })
    .optional(),

  experienceYears: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Invalid experienceYears",
    })
    .optional(),

  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .transform((val) => new Date(val))
    .optional(),

  page: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Invalid page",
    })
    .optional(),

  limit: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Invalid limit",
    })
    .optional(),
});
