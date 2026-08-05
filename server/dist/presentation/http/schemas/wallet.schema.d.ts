import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
import z from "zod";
export declare const getWalletSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<typeof TRANSACTION_TYPE>>;
    statys: z.ZodOptional<z.ZodEnum<typeof TRANSACTION_STATUS>>;
    fromDate: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<Date | undefined, string | undefined>>;
    toDate: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<Date | undefined, string | undefined>>;
    page: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    order: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.z.core.$strip>;
export declare const addMoneySchema: z.ZodObject<{
    amount: z.ZodNumber;
}, z.z.core.$strip>;
//# sourceMappingURL=wallet.schema.d.ts.map