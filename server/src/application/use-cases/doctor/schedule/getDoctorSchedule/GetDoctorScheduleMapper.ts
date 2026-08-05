import type { DoctorShift } from "#domain/entities/DoctorShift.js";
import type { IGetDoctorScheduleDTO } from "./IGetDoctorScheduleDTO.js";

export class GetDoctorScheduleMapper {
  static toDto(shifts: DoctorShift[]): IGetDoctorScheduleDTO[] {
    return shifts.map((shift) => ({
      id: shift.shiftId,
      doctorId: shift.doctorId,
      dayOfWeek: shift.dayOfWeek,
      startTime: shift.startTime.toString(),
      endTime: shift.endTime.toString(),
      consultationType: shift.consultationType,
      location: shift.location,
      slotIntervalInMinutes: shift.slotIntervalInMinutes,
      capacityPerSlot: shift.capacityPerSlot,
      createdAt: shift.createdAt.toLocaleDateString(),
    }));
  }
}
