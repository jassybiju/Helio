import { Schema, type InferSchemaType } from "mongoose";
declare const blockShiftSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const blockShiftModel: import("mongoose").Model<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: NativeDate;
    end_time: NativeDate;
    created_at: NativeDate;
    reason?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type BlockShiftDoc = InferSchemaType<typeof blockShiftSchema>;
export {};
//# sourceMappingURL=BlockShiftModel.d.ts.map