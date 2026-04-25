import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { IDoctorSlotRepository } from "@application/ports/repositories/IDoctorSlotRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGenerateFutureSlotsUseCase } from "@application/ports/use-cases/doctor/slot/IGenerateFutureSlotsUseCase.ts";
import type { SlotGenerator } from "@application/service/SlotGenerator.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { jsToEnumDay } from "@shared/utils/date.utils.ts";

export class GenerateFutureSlotsUseCase implements IGenerateFutureSlotsUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _shiftRepo: IDoctorShiftRepository,
    private readonly _slotRepo: IDoctorSlotRepository,
    private readonly _slotGen: SlotGenerator
  ) {}
  async execute(): Promise<void> {
    this._logger.info("Auto Slot Generation Started");

    // Get all active doctors
    const doctors = await this._doctorRepo.findAllActive();
    if (!doctors || doctors.length == 0) {
      this._logger.info("No active doctors");
      return;
    }
    // Get target date (today + 7 days)
    const today = new Date();

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 7);

    const dayName = jsToEnumDay[targetDate.getDay()]!;
    const dayStart = new Date(targetDate);
    dayStart.setHours(0, 0, 0, 0);
    for (const doctor of doctors) {
      try {
        // Find that weekday's schedule
        const shifts = await this._shiftRepo.findAllByDoctorAndDay(
          doctor.id,
          dayName
        );
        console.log(shifts.length);
        if (!shifts || shifts.length === 0) {
          continue;
        }

        const existingSlots = await this._slotRepo.findAllByDoctorAndDay(
          doctor.id,
          dayStart
        );

        const existingSets = new Set(
          existingSlots.map(
            (s) => `${s.doctorId}_${s.shiftId}_${s.startTime.toISOString()}`
          )
        );

        let allSlots = [];

        for (let shift of shifts) {
          const slots = this._slotGen.generateSlots(shift, targetDate);

          if (!slots || slots.length == 0) continue;

          const filteredSlots = slots.filter((slot) => {
            const key = `${slot.doctorId}_${slot.shiftId}_${slot.startTime.toISOString()}`;
            return !existingSets.has(key);
          });

          allSlots.push(...filteredSlots);
        }
        if (allSlots.length > 0) {
          await this._slotRepo.bulkInsert(allSlots);
        }
      } catch (error) {
        console.log(error);
        this._logger.error("Error generating slots", {
          doctorId: doctor.id,
          error,
        });
      }
    }

    // check if slots already exists

    // Generate + insert slots
  }
}
