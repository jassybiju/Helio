import type { DoctorSlot } from "@domain/value-objects/DoctorSlot.ts";
import type { IWeeklySlotsResponseDTO } from "./IGetDoctorWeeklySlotsDTO.ts";
import { SLOT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";

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
        slots: [
          ...Array(slot.bookedCount).fill(SLOT_STATUS.BOOKED),

          ...Array(slot.availableCount).fill(SLOT_STATUS.AVAILABLE),
        ],
      }));
    }

    return result;
  }
}
