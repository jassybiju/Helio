import z from "zod";

export const loginSchema =z.object({
  password : z.string(),
  email : z.email("Email is invalid")
})

export type LoginFormData = z.infer<typeof loginSchema>