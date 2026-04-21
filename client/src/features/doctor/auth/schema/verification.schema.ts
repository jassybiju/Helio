import { z } from "zod";

export const doctorVerificationSchema = z.object({
  additionalInfo: z
    .string("Additional Info is required")
    .min(3, "Info must be atleast 3 characters"),

  document: z.any().refine((file) => {
    if (typeof window === "undefined") return true; // skip on server
    return file instanceof FileList && file.length > 0;
  }, "Document is required"),
});

export type DoctorVerificationFormData = z.infer<
  typeof doctorVerificationSchema
>;
