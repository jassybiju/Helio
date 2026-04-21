import z from "zod";

export const patientCompleteProfileSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be 10 character")
    .max(11, "Phone number must be less than 11 characters"),
  gender: z.enum(
    ["male", "female", "other"],
    "Gender must be male , female or other",
  ),
  dob: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Date of birth must be a valid date string",
    ),
});

export type PatientCompleteProfileFormData = z.infer<
  typeof patientCompleteProfileSchema
>;
