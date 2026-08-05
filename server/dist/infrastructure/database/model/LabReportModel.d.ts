import { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
import { Schema, type InferSchemaType } from "mongoose";
export declare const labReportSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const labReportModel: import("mongoose").Model<{
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    status: LAB_REPORT_STATUS;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    appointment_id: string;
    consultation_id: string;
    test_name: string;
    requested_at: NativeDate;
    document_key?: string | null;
    created_at?: NativeDate | null;
    updated_at?: NativeDate | null;
    instructions?: string | null;
    remarks?: string | null;
    uploaded_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type LabReportDoc = InferSchemaType<typeof labReportSchema>;
//# sourceMappingURL=LabReportModel.d.ts.map