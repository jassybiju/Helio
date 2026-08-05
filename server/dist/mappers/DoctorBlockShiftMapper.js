import { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
export class DoctorBlockShiftMapper {
    static toDomain(raw) {
        return new DoctorBlockShift(raw._id, raw.doctor_id, raw.start_time, raw.end_time, raw.reason ?? null, raw.created_at);
    }
    static toPersistance(blockShift) {
        return {
            _id: blockShift.id,
            doctor_id: blockShift.doctorId,
            start_time: blockShift.startTime,
            end_time: blockShift.endTime,
            reason: blockShift.reason,
            created_at: blockShift.createdAt,
            is_deleted: false,
        };
    }
}
//# sourceMappingURL=DoctorBlockShiftMapper.js.map