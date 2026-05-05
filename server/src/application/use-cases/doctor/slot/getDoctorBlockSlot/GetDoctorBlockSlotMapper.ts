import type { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import type { IGetDoctorBlockSlotDTO } from "./IGetDoctorBlockSlotDTO.ts";

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
