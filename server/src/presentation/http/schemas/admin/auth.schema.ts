//admin login

import z from "zod";

export const adminLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});
