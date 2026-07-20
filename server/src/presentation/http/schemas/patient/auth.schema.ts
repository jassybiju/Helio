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
    ["Male", "Female", "Other"],
    "Gender must be Male , Female or Other"
  ),
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
});

// patient verify otp
export const patientVerifyOTPSchema = z.object({
  id: z.string("Id Required"),
  otp: z.string().length(6, "OTP must be 6 characters"),
});

// patient resent otp
export const patientResendOTPSchema = z.object({
  id: z.string("Invalid Id"),
});

//patient login

export const patientLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

//patient forgetPassowrd
export const patientForgetPasswordSchema = z.object({
  email: z.email("Invalid Email Address"),
});

//reset password
export const patientResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});
