import type { ISlotGenerator } from "#application/ports/services/ISlotGenerator.js";
import type { DoctorShift } from "#domain/entities/DoctorShift.js";
import { DoctorSlot } from "#domain/value-objects/DoctorSlot.js";
export declare class SlotGenerator implements ISlotGenerator {
    constructor();
    generateSlots(shift: DoctorShift, date: Date): DoctorSlot[];
    generateSlotsFromRange(shifts: DoctorShift[], startDate: Date, endDate: Date): DoctorSlot[];
    generateNextAvailableSlot(shifts: DoctorShift[], fromDate: Date): DoctorSlot[];
}
//# sourceMappingURL=SlotGenerator.d.ts.map