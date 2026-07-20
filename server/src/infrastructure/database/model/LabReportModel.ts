import { LAB_REPORT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";
import { model, Schema, type InferSchemaType } from "mongoose";

export const labReportSchema = new Schema({
  _id: { type: String, required: true },
  consultation_id: { type: String, required: true },
  appointment_id: { type: String, required: true },
  doctor_id: { type: String, required: true },
  patient_id: { type: String, required: true },
  test_name: { type: String, required: true },
  instructions: { type: String, default: null },
  status: {
    type: String,
    enum: Object.values(LAB_REPORT_STATUS),
    required: true,
  },
  document_key: { type: String, default: null },
  remarks: { type: String, default: null },
  requested_at: { type: Date, required: true },
  uploaded_at: { type: Date, default: null },
  created_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
  is_deleted: { type: Boolean, default: false },
});

export const labReportModel = model("LabReportSchema", labReportSchema);
export type LabReportDoc = InferSchemaType<typeof labReportSchema>;
