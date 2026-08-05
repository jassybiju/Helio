import { APPOINTMENT_STATUS, PAYMENT_STATUS, } from "#domain/common/enums/appointment.enum.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { model, Schema } from "mongoose";
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
        enum: APPOINTMENT_STATUS,
        default: "PENDING",
    },
    queue_number: { type: Number, default: 0 },
    consultation_started_at: { type: Date, default: null },
    consultation_ended_at: { type: Date, default: null },
    cancellation_reason: { type: String },
    payment_status: {
        type: String,
        enum: PAYMENT_STATUS,
        default: "PENDING",
    },
    payment_id: { type: String },
    rescheduled_from_appointment_id: { type: String, default: null },
    reschedule_reason: { type: String, default: null },
    rescheduled_by: {
        type: String,
        enum: USER_ROLES,
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
//# sourceMappingURL=AppointmentModel.js.map