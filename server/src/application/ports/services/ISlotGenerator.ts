import type { DoctorShift } from "#domain/entities/DoctorShift.js";
import type { DoctorSlot } from "#domain/value-objects/DoctorSlot.js";

export interface ISlotGenerator {
  generateSlots(shift: DoctorShift, date: Date): DoctorSlot[];
  generateSlotsFromRange(
    shifts: DoctorShift[],
    startDate: Date,
    endDate: Date
  ): DoctorSlot[];

  generateNextAvailableSlot(
    shifts: DoctorShift[],
    fromDate: Date
  ): DoctorSlot[];
}
