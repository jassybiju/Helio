import z from "zod";
export declare const getAllDoctorSlotsSchema: z.ZodObject<{
    dateFrom: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<Date | undefined, string | undefined>>;
    dateTo: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<Date | undefined, string | undefined>>;
    page: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    sort: z.ZodOptional<z.ZodEnum<{
        day: "day";
        time: "time";
    }>>;
    order: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.z.core.$strip>;
export declare const blockDoctorSlotSchema: z.ZodObject<{
    startTime: z.z.ZodCoercedDate<unknown>;
    endTime: z.z.ZodCoercedDate<unknown>;
    reason: z.ZodString;
    force: z.ZodOptional<z.ZodBoolean>;
}, z.z.core.$strip>;
//# sourceMappingURL=slot.schema.d.ts.map