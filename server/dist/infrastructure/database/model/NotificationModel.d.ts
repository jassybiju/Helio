import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Schema, type InferSchemaType } from "mongoose";
declare const notificationSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
}, import("mongoose").Document<unknown, {}, {
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const notificationModel: import("mongoose").Model<{
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
}, import("mongoose").Document<unknown, {}, {
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    role: USER_ROLES;
    _id: string;
    is_deleted: boolean;
    message: string;
    created_at: NativeDate;
    user_id: string;
    heading: string;
    is_read: boolean;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type NotificationRaw = InferSchemaType<typeof notificationSchema>;
export {};
//# sourceMappingURL=NotificationModel.d.ts.map