import { model, Schema, type InferSchemaType } from "mongoose";

export const reviewSchema = new Schema({
  _id: { type: String, unique: true, required: true },
  doctor_id: { type: String, required: true },
  patient_id: { type: String, required: true },
  rating: { type: Number, required: true },
  comments: { type: String, required: true },
  created_at: { type: Date },
  updated_at: { type: Date },
  is_deleted: { type: Boolean, default: false },
});

export const reviewModel = model("ReviewModel", reviewSchema);

export type ReviewRaw = InferSchemaType<typeof reviewSchema>;
