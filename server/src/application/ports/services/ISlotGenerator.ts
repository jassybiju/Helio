import type { DoctorShift } from "@domain/entities/DoctorShift.ts";
import type { DoctorSlot } from "@domain/value-objects/DoctorSlot.ts";

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
