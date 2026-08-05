import z from "zod";
export declare const getAllPatientsSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    isBlocked: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<boolean | undefined, string | undefined>>;
    isVerified: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<boolean | undefined, string | undefined>>;
    createdFrom: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<Date | undefined, string | undefined>>;
    createdTo: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<Date | undefined, string | undefined>>;
    page: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        firstName: "firstName";
        createdAt: "createdAt";
    }>>;
    order: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.z.core.$strip>;
//# sourceMappingURL=patient.schema.d.ts.map