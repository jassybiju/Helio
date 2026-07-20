import z from "zod";

export const blockDoctorSlotSchema = z
  .object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    reason: z.string(),
    force : z.boolean().optional()
  })
  .refine(
    (data) => {
      return data.endTime > data.startTime;
    },
    {
      message: "endTime must be greater than startTime",
      path: ["endTime"],
    }
  );


  export type BlockDoctorSlotFormData = z.infer<typeof blockDoctorSlotSchema>;
  