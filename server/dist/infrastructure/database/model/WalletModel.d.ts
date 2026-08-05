import { Schema, type InferSchemaType } from "mongoose";
declare const walletSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const walletModel: import("mongoose").Model<{
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    is_deleted: boolean;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: string;
    user_role: "doctor" | "patient" | "admin";
    balance: number;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type WalletDoc = InferSchemaType<typeof walletSchema>;
export {};
//# sourceMappingURL=WalletModel.d.ts.map