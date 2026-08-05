import { Schema, type InferSchemaType } from "mongoose";
export declare const reviewSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
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
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const reviewModel: import("mongoose").Model<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
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
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
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
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    rating: number;
    comments: string;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type ReviewRaw = InferSchemaType<typeof reviewSchema>;
//# sourceMappingURL=ReviewModel.d.ts.map