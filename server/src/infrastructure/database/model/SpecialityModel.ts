import { Schema, model } from "mongoose";

const specialtySchema = new Schema(
  {
    _id: { type: String, required: true }, // e.g. SPEC_01
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 👇 Force collection name (avoid your previous bug)
export const SpecialtyModel = model(
  "Specialty",
  specialtySchema,
  "specialties"
);
