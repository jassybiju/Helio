import { CHAT_SESSION_STATUS } from "#domain/common/enums/chat.enum.js";
import { Schema, type InferSchemaType } from "mongoose";
declare const chatSessionSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const chatSessionModel: import("mongoose").Model<{
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    status: CHAT_SESSION_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    expires_at?: NativeDate | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type ChatSessionRaw = InferSchemaType<typeof chatSessionSchema>;
export {};
//# sourceMappingURL=ChatSessionModel.d.ts.map