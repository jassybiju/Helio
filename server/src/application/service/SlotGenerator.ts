import type { ISlotGenerator } from "#application/ports/services/ISlotGenerator.js";
import type { DoctorShift } from "#domain/entities/DoctorShift.js";
import { DoctorSlot } from "#domain/value-objects/DoctorSlot.js";
import {
  combineDateAndTime,
  dayMap,
  istToUtc,
} from "#shared/utils/date.utils.js";

export class SlotGenerator implements ISlotGenerator {
  constructor() {}

  generateSlots(shift: DoctorShift, date: Date): DoctorSlot[] {
    const slots: DoctorSlot[] = [];

    const interval = shift.slotIntervalInMinutes;
    // const capacity = shift.capacityPerSlot;
    let currentTime = shift.startTime.clone();

    // const SLOT_PREFIX = process.env.SLOT_PREFIX;

    while (currentTime.isBefore(shift.endTime)) {
      const nextTime = currentTime.addMinutes(interval);
      if (nextTime.isAfter(shift.endTime)) {
        break;
      }

      slots.push(
        new DoctorSlot(
          shift.shiftId,
          shift.doctorId,
          istToUtc(combineDateAndTime(date, currentTime)),
          istToUtc(combineDateAndTime(date, nextTime)),
          shift.consultationType,
          shift.capacityPerSlot,
          0,
          shift.location
        )
      );

      currentTime = nextTime;
    }
    return slots;
  }

  generateSlotsFromRange(
    shifts: DoctorShift[],
    startDate: Date,
    endDate: Date
  ) {
    const slots = [];
    let current = new Date(startDate);

    while (current <= endDate) {
      let day = current.getDay();
      const matchingShifts = shifts.filter((s) => dayMap[s.dayOfWeek] === day);
      for (const shift of matchingShifts) {
        slots.push(...this.generateSlots(shift, current));
      }

      current.setDate(current.getDate() + 1);
    }
    return slots;
  }
  generateNextAvailableSlot(
    shifts: DoctorShift[],
    fromDate: Date
  ): DoctorSlot[] {
    const result: DoctorSlot[] = [];

    const doctorShiftMap = new Map<string, DoctorShift[]>();

    for (const shift of shifts) {
      if (!doctorShiftMap.has(shift.doctorId)) {
        doctorShiftMap.set(shift.doctorId, []);
      }
      doctorShiftMap.get(shift.doctorId)?.push(shift);
    }

    const completedDoctors = new Set<string>();

    let current = new Date(fromDate);

    const MAX_DAYS = 30;
    for (let i = 0; i < MAX_DAYS; i++) {
      const day = current.getDay();

      for (const [doctorId, doctorShifts] of doctorShiftMap.entries()) {
        if (completedDoctors.has(doctorId)) continue;

        const todayShifts = doctorShifts.filter(
          (s) => dayMap[s.dayOfWeek] === day
        );

        for (const shift of todayShifts) {
          const slots = this.generateSlots(shift, current);

          if (slots.length > 0) {
            result.push(slots[0]!);

            completedDoctors.add(doctorId);
            break;
          }
        }
      }
      if (completedDoctors.size === doctorShiftMap.size) {
        break;
      }

      current.setDate(current.getDate() + 1);
    }
    return result;
  }
}
