import { Schema, type InferSchemaType } from "mongoose";
declare const walletTransactionSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const walletTransactionModel: import("mongoose").Model<{
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    type: "CREDIT" | "DEBIT";
    is_deleted: boolean;
    created_at: NativeDate;
    amount: number;
    wallet_id: string;
    description?: string | null;
    reference_id?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type WalletTransactionDoc = InferSchemaType<typeof walletTransactionSchema>;
export {};
//# sourceMappingURL=WalletTransactionModel.d.ts.map