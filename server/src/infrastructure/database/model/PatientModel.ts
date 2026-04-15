import {
  model,
  Schema,
  type InferRawDocType,
  type InferSchemaType,
} from "mongoose";

const allergenSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },

  severity: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const conditionSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

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
    password_hash: {
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
    allergens: {
      type: [allergenSchema],
      default: [],
    },
    condition: {
      type: [conditionSchema],
      default: [],
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

export type PatientRawDoc = InferRawDocType<typeof patientSchema.obj>;
