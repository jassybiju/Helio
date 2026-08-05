import z from "zod";
export const sendChatSchema = z.object({
    body: z.object({
        content: z.string("Requires Content").min(1, "Min 1 character required"),
    }),
});
//# sourceMappingURL=chat.schema.js.map