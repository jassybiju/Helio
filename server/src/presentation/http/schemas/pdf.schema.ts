import { PDF_TYPE } from "@shared/types/pdf.type.ts";
import z from "zod";

export const generatePdfSchema = z.object({
  body: z
    .object({
      type: z.enum(PDF_TYPE),

      resource_id: z.string().optional(),

      from: z.string().datetime().optional(),

      to: z.string().datetime().optional(),
    })
    .superRefine((data, ctx) => {
      switch (data.type) {
        case PDF_TYPE.PATIENT_APPOINTMENT:
        case PDF_TYPE.PAYMENT_RECEIPT:
        case PDF_TYPE.DOCTOR_APPOINTMENT:
          if (!data.resource_id) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["resource_id"],
              message: "resource_id is required",
            });
          }
          break;

        case PDF_TYPE.PATIENT_TRANSACTION:
        case PDF_TYPE.DOCTOR_TRANSACTION:
        case PDF_TYPE.ADMIN_REVENUE:
          if (!data.from) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["from"],
              message: "from is required",
            });
          }

          if (!data.to) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["to"],
              message: "to is required",
            });
          }
          break;
      }
    }),
});
