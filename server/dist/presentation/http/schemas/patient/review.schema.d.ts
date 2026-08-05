import z from "zod";
export declare const addReviewSchema: z.ZodObject<{
    body: z.ZodObject<{
        comment: z.ZodString;
        rating: z.ZodNumber;
    }, z.z.core.$strip>;
    params: z.ZodObject<{
        doctorId: z.ZodString;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=review.schema.d.ts.map