import { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import type { BlockShiftDoc } from "@infrastructure/database/model/BlockShiftModel.ts";

export class DoctorBlockShiftMapper {
  static toDomain(raw: BlockShiftDoc): DoctorBlockShift {
    return new DoctorBlockShift(
      raw._id,
      raw.doctor_id,
      raw.start_time,
      raw.end_time,
      raw.reason ?? null,
      raw.created_at
    );
  }

  static toPersistance(blockShift: DoctorBlockShift): BlockShiftDoc {
    return {
      _id: blockShift.id,
      doctor_id: blockShift.doctorId,
      start_time: blockShift.startTime,
      end_time: blockShift.endTime,
      reason: blockShift.reason,
      created_at: blockShift.createdAt,
    };
  }
}
