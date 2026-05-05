import type { DoctorSlot } from "@domain/value-objects/DoctorSlot.ts";
import type {
  IGroupedSlots,
  IWeeklySlotsResponseDTO,
} from "./IGetDoctorWeeklySlotsDTO.ts";

export class GetDoctorWeeklySlotsMapper {
  static toDto(data: Record<string, DoctorSlot[]>): IWeeklySlotsResponseDTO {
    const result: IWeeklySlotsResponseDTO = {};
    for (const day in data) {
      result[day] = data[day]!.map((slot) => ({
        shiftId: slot.shiftId,
        startTime: slot.startTime.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
        endTime: slot.endTime.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
        slots: slot.slots,
      }));
    }

    return result;
  }
}
