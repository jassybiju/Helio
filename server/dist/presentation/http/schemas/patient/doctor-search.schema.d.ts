import { z } from "zod";
export declare const patientSearchDoctorSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    specialization: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    consultationType: z.ZodOptional<z.ZodEnum<{
        ONLINE: "ONLINE";
        CLINIC: "CLINIC";
    }>>;
    minFee: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    maxFee: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    experienceYears: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    date: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>>;
    page: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    limit: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
}, z.core.$strip>;
//# sourceMappingURL=doctor-search.schema.d.ts.map