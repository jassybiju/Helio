import z from "zod";

export const loginSchema =z.object({
  password : z.string(),
  email : z.email("Email is invalid")
})

export type LoginFormData = z.infer<typeof loginSchema>


//forgetPassowrd
export const forgetPasswordSchema = z.object({
  email : z.email("Invalid Email Address")
})

export type ForgetPasswordData = z.infer<typeof forgetPasswordSchema>

//reset password
export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be atleast 8 characters"),
confirmPassword: z.string().min(8, "Password must be atleast 8 characters"),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
