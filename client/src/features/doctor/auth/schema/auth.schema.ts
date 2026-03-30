import { z } from "zod";

export const doctorRegisterSchema = z.object({
  full_name: z
    .string("Full Name is required")
    .min(3, "Name must be atleast 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  specialization: z.string("Specialization should be a string"),
  career_start_year: z.string()
    .max(new Date().getFullYear(), "Invalid year"),
  gender: z.enum(["Male", "Female", "Other"], {
    error: (issue) =>
      issue.input === undefined ? "gender is required" : "Gender must be valid",
  }),
  confirmPassword : z.string(),

  document: z.any()
    .refine((file) => {
      if (typeof window === "undefined") return true; // skip on server
      return file instanceof FileList && file.length > 0;
    }, "Document is required"),

}) .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });
;

export type DoctorRegisterFormData = z.infer<typeof doctorRegisterSchema>;
