import { FOOD_TIMING } from "#domain/common/enums/consultation.enum.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import { model, Schema } from "mongoose";
const prescriptionSchema = new Schema({
    name: { type: String, required: true, trim: true },
    food_timing: {
        type: Number,
        enum: Object.values(FOOD_TIMING).filter((value) => typeof value === "number"),
        required: true,
    },
    timings: {
        morning: { type: Boolean, default: false },
        afternoon: { type: Boolean, default: false },
        night: { type: Boolean, default: false },
    },
    duration_in_days: { type: Number, required: true, min: 1 },
    instructions: { type: String, default: true, trim: true },
}, {
    _id: false,
});
const vitalsSchema = new Schema({
    blood_pressure: { type: String, default: null },
    oxygen_level: { type: Number, default: null },
    heart_rate: { type: Number, default: null },
    temperature: { type: Number, default: null },
    weight: { type: Number, default: null },
    height: { type: Number, default: null },
}, {
    _id: false,
});
const consultationSchema = new Schema({
    _id: { type: String, required: true },
    appointment_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    patient_id: { type: String, required: true },
    consultation_type: {
        type: String,
        enum: Object.values(CONSULTATION_TYPE),
        required: true,
    },
    vitals: { type: vitalsSchema, default: null },
    primary_diagnosis: { type: String, default: null },
    clinical_observation: { type: String, default: null },
    general_advice: { type: String, default: null },
    quick_note: { type: String, default: null },
    prescriptions: { type: [prescriptionSchema], default: [] },
    medication_period: { type: Number, default: null },
    free_follow_up_valid_until: { type: Date, default: null },
    free_follow_up_used: { type: Boolean, default: false },
    started_at: { type: Date, required: true },
    ended_at: { type: Date, default: null },
    created_at: { type: Date, required: true },
    is_deleted: { type: Boolean, default: false },
});
export const consultationModel = model("ConsultationModel", consultationSchema);
//# sourceMappingURL=ConsultationModel.js.map