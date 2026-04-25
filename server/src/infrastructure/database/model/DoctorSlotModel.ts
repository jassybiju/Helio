import { model, Schema, type InferSchemaType } from "mongoose";

const doctorSlotSchema = new Schema({
  _id: { type: String, required: true },
  shift_id: { type: String, required: true },
  doctor_id: { type: String, required: true },
  appointment_id: { type: String, default: null },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  consultation_type: {
    type: String,
    enum: ["ONLINE", "OFFLINE"],
    required: true,
  },
  status: {
    type: String,
    enum: ["AVAILABLE", "BOOKED", "CANCELLED"],
    required: true,
  },
  created_at: { type: Date, required: true },
  is_deleted: { type: Boolean, default: false },
});

// doctorSlotSchema.index(
//   { doctor_id: 1, start_time: 1, shift_id: 1 },
//   { unique: true, partialFilterExpression: { is_deleted: false } }
// );

export const doctorSlotModel = model("DoctorSlotModel", doctorSlotSchema);

export type DoctorSlotDoc = InferSchemaType<typeof doctorSlotSchema>;

export type DoctorSlotRawDoc = InferSchemaType<typeof doctorSlotSchema>;
