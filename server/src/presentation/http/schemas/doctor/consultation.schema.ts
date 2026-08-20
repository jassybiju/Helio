import { FOOD_TIMING } from "#domain/common/enums/consultation.enum.js";
import z from "zod";

export const doctorUpdateVitalsSchema = z.object({
  body: z.object({
    bloodPressure: z.number().nullable().optional(),
    oxygenLevel: z.number().nullable().optional(),
    heartRate: z.number().nullable().optional(),
    temperature: z.number().nullable().optional(),
    weight: z.number().nullable().optional(),
    height: z.number().nullable().optional(),
  }),
});

export const doctorAddPrescriptionSchema = z.object({
  body: z.object({
    name: z.string(),
    foodTiming: z.enum(FOOD_TIMING),
    timings: z.object({
      morning: z.boolean().default(false),
      afternoon: z.boolean().default(false),
      night: z.boolean().default(false),
    }),
    durationInDays: z.number(),
    instruction: z.string().nullable(),
  }),
});

export const doctorUpdateConsultationNotes = z.object({
  body: z
    .object({
      clinicalObservations: z.string().nullable().optional(),
      primaryDiagnosis: z.string().nullable().optional(),
      generalAdvice: z.string().nullable().optional(),
      quickNote: z.string().nullable().optional(),
      medicationDuration: z.number().nullable().optional(),
    })
    .refine(
      (data) =>
        Object.values(data).some(
          (value) => value !== undefined && value !== null
        ),
      {
        message: "At least one field must be provided",
      }
    ),
});

export const doctorViewHistorySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 10)),
  }),
});
