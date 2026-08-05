import z from "zod";
export declare const getAllNotificationSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>, z.ZodNumber>;
        limit: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>, z.ZodNumber>;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=notification.schema.d.ts.map