import {z} from 'zod'

export const otpSchema = z.object({
  otp : z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d{6}$/, 'OTP must contain only numbers'),
  id : z.string()
})

export type OTPFormData = z.infer<typeof otpSchema>

