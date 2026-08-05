import z from "zod";
export declare const aiChatBotSchema: z.ZodObject<{
    body: z.ZodObject<{
        conversationId: z.ZodPipe<z.ZodNullable<z.ZodString>, z.ZodTransform<string | null, string | null>>;
        message: z.ZodString;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=ai.schema.d.ts.map