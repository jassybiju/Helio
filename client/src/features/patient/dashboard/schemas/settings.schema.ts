import { BLOOD_GROUP } from "@/src/types/user.types";
import z from "zod";

export const updatePatientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),

  gender: z.enum(["male", "female", "other"]),

  dob: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Date of birth must be a valid date string",
    )
    .refine(
      (date) => new Date(date) < new Date(),
      "Date of birth must be before today",
    ),
  bloodGroup: z.enum(BLOOD_GROUP),

  phone: z.string().min(9),
});

export type UpdatePatientFormData = z.infer<typeof updatePatientSchema>;
