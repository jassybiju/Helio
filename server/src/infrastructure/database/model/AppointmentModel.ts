import { model, Schema, type InferSchemaType } from "mongoose";

const appointmentSchema = new Schema({
  _id: { type: String, required: true },
  doctor_id: { type: String, required: true },
  patient_id: { type: String, required: true },

  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },

  consultation_type: {
    type: String,
    enum: ["ONLINE", "CLINIC"],
    required: true,
  },
  consultation_fee: { type: Number, required: true },
  platform_fee: { type: Number, required: true },
  total_amount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: [
      "PENDING",
      "ONGOING",
      "NO_SHOW",
      "CONFIRMED",
      "CANCELLED",
      "COMPLETED",
      "EXPIRED",
    ],
    default: "PENDING",
  },
  cancellation_reason: { type: String },
  payment_status: {
    type: String,
    enum: ["PENDING", "PAID", "REFUNDED"],
    default: "PENDING",
  },
  payment_id: { type: String },

  rescheduled_from_appointment_id: { type: String, default: null },
  reschedule_reason: { type: String, default: null },
  rescheduled_by: {
    type: String,
    enum: ["DOCTOR", "PATIENT"],
    default: null,
  },
  rescheduled_at: { type: Date, default: null },
  reschedule_count: { type: Number, default: 0 },
  is_deleted: { type: Boolean, default: false },
  expires_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

appointmentSchema.index({
  doctor_id: 1,
  start_time: 1,
  consultation_type: 1,
  status: 1,
});

export const appointmentModel = model("AppointmentModel", appointmentSchema);

export type AppointmentRaw = InferSchemaType<typeof appointmentSchema>;
