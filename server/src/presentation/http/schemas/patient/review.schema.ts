import z from "zod";

export const addReviewSchema = z.object({
  body: z.object({
    comment: z.string(),
    rating: z.number(),
  }),
  params: z.object({ doctorId: z.string() }),
});
