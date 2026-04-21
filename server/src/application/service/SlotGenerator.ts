import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ISlotGenerator } from "@application/ports/services/ISlotGenerator.ts";
import { SLOT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";
import type { DoctorShift } from "@domain/entities/DoctorShift.ts";
import { DoctorSlot } from "@domain/entities/DoctorSlot.ts";
import { combineDateAndTime } from "@shared/utils/date.utils.ts";

export class SlotGenerator implements ISlotGenerator {
  constructor(private readonly _idGenerator: IIDGenerator) {}
  generateSlots(shift: DoctorShift, date: Date): DoctorSlot[] {
    const slots: DoctorSlot[] = [];

    const interval = shift.slotIntervalInMinutes;
    const capacity = shift.capacityPerSlot;
    let currentTime = shift.startTime;

    const SLOT_PREFIX = process.env.SLOT_PREFIX;

    // while (currentTime.isBefore(shift.endTime)) {
    //   const nextTime = currentTime.addMinutes(interval);
    //   console.log(nextTime, currentTime)
    //   for (let i = 0; i < capacity; i++) {
    //     slots.push(
    //       new DoctorSlot(
    //         this._idGenerator.generate(SLOT_PREFIX!),
    //         shift.shiftId,
    //         shift.doctorId,
    //         null,
    //         combineDateAndTime(date, currentTime),
    //         combineDateAndTime(date, nextTime),
    //         shift.consultationType,
    //         SLOT_STATUS.AVAILABLE,
    //         new Date()
    //       )
    //     );
    //   }

    //   currentTime = nextTime;
    // }

    while (true) {
      const nextTime = currentTime.addMinutes(interval);

      if (nextTime.isAfter(shift.endTime)) {
        break;
      }

      for (let i = 0; i < capacity; i++) {
        slots.push(
          new DoctorSlot(
            this._idGenerator.generate(SLOT_PREFIX!),
            shift.shiftId,
            shift.doctorId,
            null,
            combineDateAndTime(date, currentTime),
            combineDateAndTime(date, nextTime),
            shift.consultationType,
            SLOT_STATUS.AVAILABLE,
            new Date()
          )
        );
      }

      currentTime = nextTime;
    }
    return slots;
  }
}
