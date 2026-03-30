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
      required: true,
    },
    phone: {
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
    dob: {
      type: Date,
      required: true,
    },
    blood_group: {
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

export const patientModel = model("PatientModel", patientSchema);

export type PatientDoc = InferSchemaType<typeof patientSchema>;
