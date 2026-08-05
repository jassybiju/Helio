import { FOOD_TIMING } from "#domain/common/enums/consultation.enum.js";
import z from "zod";
export declare const doctorUpdateVitalsSchema: z.ZodObject<{
    body: z.ZodObject<{
        bloodPressure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        oxygenLevel: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        heartRate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        temperature: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        weight: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
export declare const doctorAddPrescriptionSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        foodTiming: z.ZodEnum<typeof FOOD_TIMING>;
        timings: z.ZodObject<{
            morning: z.ZodDefault<z.ZodBoolean>;
            afternoon: z.ZodDefault<z.ZodBoolean>;
            night: z.ZodDefault<z.ZodBoolean>;
        }, z.z.core.$strip>;
        durationInDays: z.ZodNumber;
        instruction: z.ZodNullable<z.ZodString>;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
export declare const doctorUpdateConsultationNotes: z.ZodObject<{
    body: z.ZodObject<{
        clinicalObservations: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        primaryDiagnosis: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        generalAdvice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quickNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        medicationDuration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
export declare const doctorViewHistorySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
        limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=consultation.schema.d.ts.map