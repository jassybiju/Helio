import { DoctorShift } from "@domain/entities/DoctorShift.ts";
import type {
  CONSULTATION_TYPE,
  DAY_OF_WEEK,
} from "@domain/common/enums/doctorShift.enum.ts";
import { Time } from "@domain/value-objects/Time.ts";

export class DoctorShiftMapper {
  static toDomain(raw: {
    _id: string;
    doctor_id: string;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    created_at: Date;
    location?: string | null;
    is_deleted: boolean;
  }): DoctorShift {
    return new DoctorShift(
      raw._id,
      raw.doctor_id,
      raw.day_of_week as DAY_OF_WEEK,
      new Time(raw.start_time),
      new Time(raw.end_time),
      raw.consultation_type as CONSULTATION_TYPE,
      raw.location ?? null,
      raw.slot_interval_in_minutes,
      raw.capacity_per_slot,
      raw.created_at,
      raw.is_deleted
    );
  }

  static toPersistance(t: DoctorShift): {
    _id: string;
    doctor_id: string;
    day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    start_time: string;
    end_time: string;
    consultation_type: "ONLINE" | "CLINIC";
    slot_interval_in_minutes: number;
    capacity_per_slot: number;
    created_at: NativeDate;
    location?: string | null;
    is_deleted: boolean;
  } {
    return {
      _id: t.shiftId,
      doctor_id: t.doctorId,
      day_of_week: t.dayOfWeek,
      start_time: t.startTime.toString(),
      end_time: t.endTime.toString(),
      consultation_type: t.consultationType,
      slot_interval_in_minutes: t.slotIntervalInMinutes,
      capacity_per_slot: t.capacityPerSlot,
      location: t.location,
      created_at: t.createdAt,
      is_deleted: t.isDeleted,
    };
  }
}
