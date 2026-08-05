import z from "zod";
export const aiChatBotSchema = z.object({
    body: z.object({
        conversationId: z
            .string()
            .nullable()
            .transform((val) => (val ? val : null)),
        message: z.string(),
    }),
});
//# sourceMappingURL=ai.schema.js.map