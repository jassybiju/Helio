import z from "zod";

export const doctorCompleteProfileSchema = z.object({
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

export const doctorUpdateFeeSchema = z.object({
  onlineFee: z
    .number("Fee Should be a numebr")
    .min(10, "Should be greater than 10"),
  clinicFee: z
    .number("Fee Should be a numebr")
    .min(10, "Should be greater than 10"),
});
