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
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    specialization: {
      type: String,
      required: true,
    },
    career_start_year: {
      type: Number,
      required: true,
    },
    bio: {
      type: String,
      default: null,
    },
    verification_status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected", "resubmitted"],
    },
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
      required: true,
    },
    is_blocked: {
      required: true,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const doctorModel = model("DoctorModel", doctorSchema);

export type DoctorDoc = InferSchemaType<typeof doctorSchema>;
