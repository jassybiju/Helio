import z from "zod";

export const patientRegisterSchema = z
  .object({
    first_name: z.string().min(3, "Name must be atleast 3 characters"),
    last_name: z.string().min(3, "Name must be atleast 3 characters"),
    email: z.email("Invalid email address"),
    phone: z
      .string()
      .regex(/^\d{10,11}$/, "Phone number must contain 10 or 11 digits"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    gender: z.enum(
      ["Male", "Female", "Other"],
      "Gender must be Male , Female or Other",
    ),
    dob: z
      .string("Dob is required")
      .refine(
        (date) => !isNaN(Date.parse(date)),
        "Date of birth must be a valid date string",
      )
      .refine(
        (date) => new Date(date) < new Date(),
        "Date of birth must be before today",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PatientRegistrationFormData = z.infer<typeof patientRegisterSchema>;

// // patient verify otp
// export const patientVerifyOTPSchema = z.object({
//   id: z.string("Id Required"),
//   otp: z.string().length(6, "OTP must be 6 characters"),
// });

// // patient resent otp
// export const patientResendOTPSchema = z.object({
//   id: z.string("Invalid Id"),
// });

// //patient login

// export const patientLoginSchema = z.object({
//   email: z.email("Invalid email address"),
//   password: z.string(),
// });
