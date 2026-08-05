import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Schema, type InferSchemaType } from "mongoose";
export declare const chatMessageSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const chatMessageModel: import("mongoose").Model<{
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    chat_session_id: string;
    sender_id: string;
    sender_role: USER_ROLES;
    read_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type ChatMessageRaw = InferSchemaType<typeof chatMessageSchema>;
//# sourceMappingURL=ChatMessageModel.d.ts.map