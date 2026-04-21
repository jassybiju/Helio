import { model, Schema, type InferSchemaType } from "mongoose";

const doctorSlotSchema = new Schema({
  _id: { type: String, required: true },
  shift_id: { type: String, required: true },
  doctor_id: { type: String, required: true },
  appointment_id: { type: String, default: null },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  consultation_type: { enum: ["ONLINE", "OFFLINE"], required: true },
  status: { enum: ["AVAILABLE", "BOOKED", "CANCELLED"], required: true },
  created_at: { type: Date, required: true },
});

export const doctorSlotModel = model("DoctorSlotModel", doctorSlotSchema);

export type DoctorSlotDoc = InferSchemaType<typeof doctorSlotSchema>;

export type DoctorSlotRawDoc = InferSchemaType<typeof doctorSlotSchema>;
