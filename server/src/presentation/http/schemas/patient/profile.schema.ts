import { BLOOD_GROUP } from "#domain/common/enums/blood-group.enum.js";
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
    )
    .refine(
      (date) => new Date(date) < new Date(),
      "Date of birth must be before today"
    ),
  phone: z
    .string()
    .min(10, "Phone number must be 10 character")
    .max(11, "Phone number must be less than 11 characters"),
});

export const updatePatientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),

  gender: z.enum(["male", "female", "other"]),

  dob: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Date of birth must be a valid date string"
    )
    .refine(
      (date) => new Date(date) < new Date(),
      "Date of birth must be before today"
    ),
  bloodGroup: z.enum(BLOOD_GROUP),

  phone: z.string().min(9),
});
