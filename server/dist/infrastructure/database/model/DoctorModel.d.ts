import { Schema, type InferSchemaType } from "mongoose";
declare const doctorSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
} & import("mongoose").DefaultTimestampProps & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const doctorModel: import("mongoose").Model<{
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
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
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
} & import("mongoose").DefaultTimestampProps & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    email: string;
    full_name: string;
    verification_status: "pending" | "approved" | "rejected" | "resubmitted";
    verification_history: import("mongoose").Types.DocumentArray<{
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }, {}, {}> & {
        acted_at: NativeDate;
        status?: "pending" | "approved" | "rejected" | "resubmitted" | null;
        reason?: string | null;
        document_key?: string | null;
    }>;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    gender?: "Male" | "Female" | "Other" | null;
    specialization?: string | null;
    bio?: string | null;
    career_start_year?: number | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    document_key?: string | null;
    online_fee?: number | null;
    clinic_fee?: number | null;
    rejection_reason?: string | null;
    additional_info?: string | null;
    google_id?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type DoctorDoc = InferSchemaType<typeof doctorSchema>;
type VerificationStatus = InferSchemaType<typeof doctorSchema>["verification_status"];
export type DoctorRawDoc = Omit<InferSchemaType<typeof doctorSchema>, "verification_history"> & {
    verification_history: {
        status: VerificationStatus;
        reason: string | null;
        document_key: string | null;
        acted_at: Date;
    }[];
};
export {};
//# sourceMappingURL=DoctorModel.d.ts.map