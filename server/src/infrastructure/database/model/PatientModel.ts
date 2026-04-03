import { model, Schema, type InferSchemaType } from "mongoose";

const patientSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    phone: {
      type: String,
    },
    passwordHash: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dob: {
      type: Date,
    },
    blood_group: {
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

export const patientModel = model("PatientModel", patientSchema);

export type PatientDoc = InferSchemaType<typeof patientSchema>;
