import { PDF_TYPE } from "#shared/types/pdf.type.js";
import z from "zod";
export declare const generatePdfSchema: z.ZodObject<{
    body: z.ZodObject<{
        type: z.ZodEnum<typeof PDF_TYPE>;
        resource_id: z.ZodOptional<z.ZodString>;
        from: z.ZodOptional<z.ZodString>;
        to: z.ZodOptional<z.ZodString>;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=pdf.schema.d.ts.map