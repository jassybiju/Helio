import { model, Schema, type InferSchemaType } from "mongoose";

const doctorShiftSchema = new Schema({
  _id: { type: String, required: true },
  doctor_id: { type: String, required: true },
  day_of_week: {
    type: String,
    enum: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
    required: true,
  },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  consultation_type: {
    type: String,
    enum: ["ONLINE", "CLINIC"],
    required: true,
  },
  location: { type: String, default: null },
  slot_interval_in_minutes: { type: Number, required: true },
  capacity_per_slot: { type: Number, required: true },
  created_at: { type: Date, required: true },
  is_deleted : {type : Boolean, default : false}
});

export const doctorShiftModel = model("DoctorShiftModel", doctorShiftSchema);

export type DoctorShiftDoc = InferSchemaType<typeof doctorShiftSchema>;

export type DoctorShiftRawDoc = InferSchemaType<typeof doctorShiftSchema>;
