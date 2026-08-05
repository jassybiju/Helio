import { Schema, type InferSchemaType } from "mongoose";
declare const doctorShiftSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
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
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const doctorShiftModel: import("mongoose").Model<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
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
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
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
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    created_at: NativeDate;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    location?: string | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type DoctorShiftDoc = InferSchemaType<typeof doctorShiftSchema>;
export type DoctorShiftRawDoc = InferSchemaType<typeof doctorShiftSchema>;
export {};
//# sourceMappingURL=DoctorShiftModel.d.ts.map