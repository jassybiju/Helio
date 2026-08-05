import type {
  APPOINTMENT_STATUS,
  PAYMENT_STATUS,
} from "#domain/common/enums/appointment.enum.js";
import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Appointment } from "#domain/entities/Appointment.js";
import type { AppointmentRaw } from "#infrastructure/database/model/AppointmentModel.js";

export class AppointmentMapper {
  static toDomain(raw: AppointmentRaw): Appointment {
    return new Appointment(
      raw._id,
      raw.doctor_id,
      raw.patient_id,
      new Date(raw.start_time),
      new Date(raw.end_time),
      raw.consultation_type as CONSULTATION_TYPE,
      raw.consultation_fee,
      raw.total_amount,
      raw.platform_fee,
      raw.status as APPOINTMENT_STATUS,
      raw.cancellation_reason ?? null,
      raw.queue_number,
      raw.consultation_started_at ?? null,
      raw.consultation_ended_at ?? null,
      raw.payment_status as PAYMENT_STATUS,
      raw.payment_id ?? null,
      raw.rescheduled_from_appointment_id ?? null,
      raw.reschedule_reason ?? null,
      raw.rescheduled_by ?? null,
      raw.rescheduled_at ?? null,
      raw.reschedule_count ?? null,
      raw.expires_at ? new Date(raw.expires_at) : new Date(),
      raw.created_at ? new Date(raw.created_at) : new Date(),
      raw.updated_at ? new Date(raw.updated_at) : new Date()
    );
  }

  static toPersistence(domain: Appointment): AppointmentRaw {
    return {
      _id: domain.id,
      doctor_id: domain.doctorId,
      patient_id: domain.patientId,

      start_time: domain.startTime,
      end_time: domain.endTime ?? null,

      consultation_type: domain.consultationType,
      consultation_fee: domain.consultationFee,
      total_amount: domain.totalAmount,
      platform_fee: domain.platformFee,
      status: domain.status,
      cancellation_reason: domain.cancellationReason ?? null,

      queue_number: domain.queueNumber,
      consultation_ended_at: domain.consultationEndedAt,
      consultation_started_at: domain.consultationStartedAt,
      payment_status: domain.paymentStatus,
      payment_id: domain.paymentId ?? null,

      rescheduled_from_appointment_id:
        domain.rescheduledFromAppointmentId ?? null,
      reschedule_reason: domain.rescheduleReason ?? null,
      rescheduled_by: domain.rescheduledBy as USER_ROLES,
      rescheduled_at: domain.rescheduledAt ?? null,
      reschedule_count: domain.rescheduleCount ?? 0,

      expires_at: domain.expiresAt,

      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
      is_deleted: false,
    };
  }
}
