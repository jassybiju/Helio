import z from "zod";

export const patientCompleteProfileSchema = z.object({
  gender: z.enum(["male", "female", "other"], {
    error: (issue) =>
      issue.input === undefined ? "gender is required" : "Gender must be valid",
  }),
  dob: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Date of birth must be a valid date string"
    ),
  phone: z
    .string()
    .min(10, "Phone number must be 10 character")
    .max(11, "Phone number must be less than 11 characters"),
});
