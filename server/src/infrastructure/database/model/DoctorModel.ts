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
    fullName: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
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
    verfication_history: [
      {
        status: {
          type: String,
          enum: ["pending", "approved", "rejected", "resubmitted"],
        },
        reason : {
          type : String,
          default : null
        },
        document_key : {
          type : String,
          default : null
        },
        acted_at : {
          type : Date, 
          default : Date.now
        }
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
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_blocked: {
      default: false,
      type: Boolean,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const doctorModel = model("DoctorModel", doctorSchema);

export type DoctorDoc = InferSchemaType<typeof doctorSchema>;
