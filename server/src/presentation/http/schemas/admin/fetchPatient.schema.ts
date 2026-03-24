import z from "zod";

export const fetchPatientSchema = z.object({
  char: z.string(),
});
