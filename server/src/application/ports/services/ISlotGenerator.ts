import type { DoctorShift } from "@domain/entities/DoctorShift.ts";
import type { DoctorSlot } from "@domain/entities/DoctorSlot.ts";

export interface ISlotGenerator {
  generateSlots(shift: DoctorShift, date: Date): DoctorSlot[];
}
