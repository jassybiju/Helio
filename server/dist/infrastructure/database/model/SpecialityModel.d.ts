import { Schema } from "mongoose";
export declare const SpecialtyModel: import("mongoose").Model<{
    _id: string;
    name: string;
    isActive: boolean;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    name: string;
    isActive: boolean;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    _id: string;
    name: string;
    isActive: boolean;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    _id: string;
    name: string;
    isActive: boolean;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    _id: string;
    name: string;
    isActive: boolean;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    _id: string;
    name: string;
    isActive: boolean;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    name: string;
    isActive: boolean;
    description?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    name: string;
    isActive: boolean;
    description?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
//# sourceMappingURL=SpecialityModel.d.ts.map