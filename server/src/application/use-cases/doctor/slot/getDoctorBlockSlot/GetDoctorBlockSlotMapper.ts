import type { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import type { IGetDoctorBlockSlotDTO } from "./IGetDoctorBlockSlotDTO.js";

export class GetDoctorBlockSlotMapper {
  static toDto(blockShift: DoctorBlockShift[]): IGetDoctorBlockSlotDTO[] {
    return blockShift.map((bs) => ({
      id: bs.id,
      startDate: bs.startTime.toISOString(),
      endDate: bs.endTime.toISOString(),
      reason: bs.reason ?? null,
    }));
  }
}
