import z from "zod";

export const doctorCompleteProfileSchema = z.object({
  specialization: z.string("Specialization should be a string").min(2, "SHould be valid"),
  career_start_year: z.coerce
    .number("Career Start year required")
    .min(1900, "Year should be greater than 1900")
    .max(new Date().getFullYear(), "Year should be smaller than current Year"),
  gender: z.enum(["Male", "Female", "Other"], {
    error: (issue) =>
      issue.input === undefined ? "gender is required" : "Gender must be valid",
  }),

  document: z.any().refine((file) => {
    if (typeof window === "undefined") return true; // skip on server
    return file instanceof FileList && file.length > 0;
  }, "Document is required"),
});

export type DoctorCompleteProfileFormData = z.infer<
  typeof doctorCompleteProfileSchema
>;
