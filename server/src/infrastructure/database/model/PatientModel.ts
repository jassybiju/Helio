import { model, Schema, type InferSchemaType } from "mongoose";

const patientSchema = new Schema(
  {
    id: {
      type: "string",
      unique: true,
      required: true,
    },
    email: {
      type: "string",
      unique: true,
      required: true,
    },
    first_name: {
      type: "string",
      required: true,
    },
    last_name: {
      type: "string",
      required: true,
    },
    passwordHash: {
      type: "string",
      required: true,
    },
    gender: {
      type: "string",
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    dob: {
      type: "date",
      required: true,
    },
    blood_group: {
      type: "string",
      default: null,
    },
    is_verified: {
      type: "boolean",
      required: true,
    },
    is_blocked: {
      required: true,
      type: "boolean",
    },
  },
  {
    timestamps: true,
  }
);

export const patientModel = model("PatientModel", patientSchema);

export type PatientDoc = InferSchemaType<typeof patientSchema>;
