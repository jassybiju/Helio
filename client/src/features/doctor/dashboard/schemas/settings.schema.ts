import z from "zod";

export const doctorUpdateProfileSchema = z.object({
  specialization: z.string("Specialization should be a string"),
  fullName: z
    .string("Full Name is required")
    .min(3, "Name must be atleast 3 characters"),
  bio: z
    .string("Bio should be string")
    .min(10, "Bio must be atleast 10 characters"),
});

export type UpdateDoctorFormData = z.infer<typeof doctorUpdateProfileSchema>;
