import { DoctorShift } from "#domain/entities/DoctorShift.js";
import { Time } from "#domain/value-objects/Time.js";
export class DoctorShiftMapper {
    static toDomain(raw) {
        return new DoctorShift(raw._id, raw.doctor_id, raw.day_of_week, new Time(raw.start_time), new Time(raw.end_time), raw.consultation_type, raw.location ?? null, raw.slot_interval_in_minutes, raw.capacity_per_slot, raw.created_at, raw.is_deleted);
    }
    static toPersistance(t) {
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
//# sourceMappingURL=DoctorShiftMapper.js.map