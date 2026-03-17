import z from "zod";

export const patientRegisterSchema = z.object({
  first_name: z.string().min(3, "Name must be atleast 3 characters"),
  last_name: z.string().min(3, "Name must be atleast 3 characters"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be 10 character")
    .max(11, "Phone number must be less than 11 characters"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  gender: z.enum(
    ["male", "female", "other"],
    "Gender must be male , female or other"
  ),
  dob: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Date of birth must be a valid date string"
    ),
});
