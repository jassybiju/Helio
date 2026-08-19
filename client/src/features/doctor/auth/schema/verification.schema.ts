import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const isServer = typeof window === "undefined";

export const doctorVerificationSchema = z.object({
  additionalInfo: z
    .string("Additional Info is required")
    .min(3, "Info must be atleast 3 characters"),

  document: isServer
    ? z.any()
    : z
        .instanceof(FileList, { message: "File is required" })
        .refine((files) => files.length > 0, { message: "No file selected" })
        .refine((files) => files[0].size <= MAX_FILE_SIZE, {
          message: `File size must be less than 5MB`,
        }),
});

export type DoctorVerificationFormData = z.infer<
  typeof doctorVerificationSchema
>;
