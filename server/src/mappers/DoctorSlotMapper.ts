import type {
  CONSULTATION_TYPE,
  SLOT_STATUS,
} from "@domain/common/enums/doctorShift.enum.ts";
import { DoctorSlot } from "@domain/entities/DoctorSlot.ts";
import { Time } from "@domain/value-objects/Time.ts";
import type { DoctorSlotRawDoc } from "@infrastructure/database/model/DoctorSlotModel.ts";

export class DoctorSlotMapper {
  static toPersistance(slot: DoctorSlot): DoctorSlotRawDoc {
    console.log(slot);
    return {
      _id: slot.slotId,
      doctor_id: slot.doctorId,
      shift_id: slot.shiftId,
      appointment_id: slot.appointmentId,
      start_time: slot.startTime.toString(),
      end_time: slot.endTime.toString(),
      status: slot.status as "AVAILABLE" | "BOOKED" | "CANCELLED",
      consultation_type: slot.consultationType as "ONLINE" | "OFFLINE",
      created_at: slot.createdAt,
      is_deleted: slot.isDeleted,
    };
  }

  static toDomain(raw: DoctorSlotRawDoc): DoctorSlot {
    return new DoctorSlot(
      raw._id,
      raw.shift_id,
      raw.doctor_id,
      raw.appointment_id ?? null,
      new Date(raw.start_time),
      new Date(raw.end_time),
      raw.consultation_type as CONSULTATION_TYPE,
      raw.status as SLOT_STATUS,
      raw.created_at,
      raw.is_deleted
    );
  }
}
