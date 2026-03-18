import z from "zod";

export const doctorRegisterSchema = z.object({
  full_name: z
    .string("Full Name is required")
    .min(3, "Name must be atleast 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  specialization: z.string("Specialization should be a string"),
  career_start_year: z.coerce
    .number("Career Start year required")
    .min(1900, "Year should be greater than 1900")
    .max(new Date().getFullYear(), "Year should be smaller than current Year"),
  gender: z.enum(["Male", "Female", "Other"], {
    error: (issue) =>
      issue.input === undefined ? "gender is required" : "Gender must be valid",
  }),
});
