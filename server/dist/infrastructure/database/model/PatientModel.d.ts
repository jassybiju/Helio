import { Schema, type InferSchemaType } from "mongoose";
declare const patientSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
} & import("mongoose").DefaultTimestampProps & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const patientModel: import("mongoose").Model<{
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
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
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
} & import("mongoose").DefaultTimestampProps & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>, {
    _id: string;
    condition: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
    }>;
    email: string;
    first_name: string;
    is_verified: boolean;
    is_blocked: boolean;
    is_deleted: boolean;
    allergens: import("mongoose").Types.DocumentArray<{
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, import("mongoose").Types.Subdocument<string, unknown, {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }, {}, {}> & {
        _id: string;
        createdAt: NativeDate;
        name: string;
        severity?: "LOW" | "MEDIUM" | "HIGH" | null;
    }>;
    gender?: "Male" | "Female" | "Other" | null;
    dob?: NativeDate | null;
    phone?: string | null;
    password_hash?: string | null;
    profile_pic_key?: string | null;
    google_id?: string | null;
    last_name?: string | null;
    blood_group?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type PatientDoc = InferSchemaType<typeof patientSchema>;
export type PatientRawDoc = Omit<InferSchemaType<typeof patientSchema>, "allergens" | "condition"> & {
    allergens: Array<{
        _id: string;
        name: string;
        severity: string;
        createdAt: Date;
    }>;
    condition: Array<{
        _id: string;
        name: string;
        createdAt: Date;
    }>;
};
export {};
//# sourceMappingURL=PatientModel.d.ts.map