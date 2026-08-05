import { FOOD_TIMING } from "#domain/common/enums/consultation.enum.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import { Schema, type InferSchemaType } from "mongoose";
declare const consultationSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
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
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type ConsultationDoc = InferSchemaType<typeof consultationSchema>;
export type ConsultationRawDoc = Omit<InferSchemaType<typeof consultationSchema>, "prescriptions"> & {
    prescriptions: {
        name: string;
        food_timing: number;
        timings: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        };
        duration_in_days: number;
        instructions: string | null;
    }[];
};
export declare const consultationModel: import("mongoose").Model<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
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
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
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
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    is_deleted: boolean;
    doctor_id: string;
    patient_id: string;
    consultation_type: CONSULTATION_TYPE;
    created_at: NativeDate;
    appointment_id: string;
    prescriptions: import("mongoose").Types.DocumentArray<{
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }, {}, {}> & {
        name: string;
        food_timing: FOOD_TIMING;
        duration_in_days: number;
        instructions: string;
        timings?: {
            morning: boolean;
            afternoon: boolean;
            night: boolean;
        } | null;
    }>;
    free_follow_up_used: boolean;
    started_at: NativeDate;
    vitals?: {
        blood_pressure?: string | null;
        oxygen_level?: number | null;
        heart_rate?: number | null;
        temperature?: number | null;
        weight?: number | null;
        height?: number | null;
    } | null;
    primary_diagnosis?: string | null;
    clinical_observation?: string | null;
    general_advice?: string | null;
    quick_note?: string | null;
    medication_period?: number | null;
    free_follow_up_valid_until?: NativeDate | null;
    ended_at?: NativeDate | null;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export {};
//# sourceMappingURL=ConsultationModel.d.ts.map