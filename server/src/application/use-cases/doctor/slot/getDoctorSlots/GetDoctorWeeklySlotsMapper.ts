import type {
  IGroupedSlots,
  IWeeklySlotsResponseDTO,
} from "./IGetDoctorWeeklySlotsDTO.ts";

export class GetDoctorWeeklySlotsMapper {
  static toDto(data: Record<string, IGroupedSlots[]>): IWeeklySlotsResponseDTO {
    const result: IWeeklySlotsResponseDTO = {};

    for (const day in data) {
      result[day] = data[day]!.map((slot) => ({
        shiftId: slot.shiftId,
        startTime: slot.startTime.toISOString(),
        endTime: slot.endTime.toISOString(),

        slots: slot.slots.map((s) => ({
          id: s.id,
          appointmentId: s.appointmentId,
          status: s.status,
        })),
      }));
    }

    return result;
  }
}
