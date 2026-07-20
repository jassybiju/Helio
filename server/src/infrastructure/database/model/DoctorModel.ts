import { model, Schema, type InferSchemaType } from "mongoose";

const doctorSchema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    password_hash: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    profile_pic_key: {
      type: String,
      default: null,
    },
    specialization: {
      type: String,
    },
    career_start_year: {
      type: Number,
    },
    bio: {
      type: String,
      default: null,
    },
    verification_status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected", "resubmitted"],
    },
    verification_history: [
      {
        status: {
          type: String,
          enum: ["pending", "approved", "rejected", "resubmitted"],
        },
        reason: {
          type: String,
          default: null,
        },
        document_key: {
          type: String,
          default: null,
        },
        acted_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    online_fee: {
      type: Number,
      default: null,
    },
    clinic_fee: {
      type: Number,
      default: null,
    },
    document_key: {
      type: String,
      default: null,
    },
    rejection_reason: {
      type: String,
      default: null,
    },
    additional_info: {
      type: String,
      default: null,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_blocked: {
      default: false,
      type: Boolean,
    },
    google_id: {
      type: String,
    },
    is_deleted: {
      default: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const doctorModel = model("DoctorModel", doctorSchema);

export type DoctorDoc = InferSchemaType<typeof doctorSchema>;

type VerificationStatus = InferSchemaType<
  typeof doctorSchema
>["verification_status"];

export type DoctorRawDoc = Omit<
  InferSchemaType<typeof doctorSchema>,
  "verification_history"
> & {
  verification_history: {
    status: VerificationStatus;
    reason: string | null;
    document_key: string | null;
    acted_at: Date;
  }[];
};
