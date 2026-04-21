import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ISlotGenerator } from "@application/ports/services/ISlotGenerator.ts";
import type {
  IDoctorScheduleInput,
  ISetDoctorScheduleUseCase,
} from "@application/ports/use-cases/doctor/schedule/ISetDoctorScheduleUseCase.ts";
import { DoctorShift } from "@domain/entities/DoctorShift.ts";
import { Time } from "@domain/value-objects/Time.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { getNextDatesForDay } from "@shared/utils/date.utils.ts";

export class SetDoctorScheduleUseCase implements ISetDoctorScheduleUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorShiftRepo: IDoctorShiftRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _slotGen: ISlotGenerator
  ) {}
  async execute(doctorId: string, input: IDoctorScheduleInput): Promise<void> {
    this._logger.info("Set Doctor ScheduleUseCase", {
      doctorId,
      options: input,
    });

    // validation if doctor exists
    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    if (!doctor.canAccessPlatform()) {
      throw new AppError(MESSAGE.INVALID_REQUEST, HTTPStatus.FORBIDDEN);
    }

    const {
      dayOfWeek,
      location,
      startTime,
      endTime,
      slotIntervalInMinutes,
      capacityPerSlot,
      consultationType,
    } = input;

    // creating new Shift instance
    const SHIFT_PREFIX = process.env.SHIFT_PREFIX!;
    const newShift = new DoctorShift(
      this._idGenerator.generate(SHIFT_PREFIX),
      doctorId,
      dayOfWeek,
      new Time(startTime),
      new Time(endTime),
      consultationType,
      location ?? null,
      slotIntervalInMinutes,
      capacityPerSlot,
      new Date()
    );

    // getting existing shift of the doctor on the day
    const existingShift = await this._doctorShiftRepo.findByDoctorAndDay(
      doctorId,
      dayOfWeek
    );
    console.log(newShift, existingShift);
    // checking if overlap exists
    const isNotOverLapping = newShift.isNotOverLapping(existingShift);
    if (!isNotOverLapping) {
      throw new AppError(
        MESSAGE.DOCTOR_SHEDULE_OVERLAP_ERROR,
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }

    // creates slots for 1 week
    const dates = getNextDatesForDay(dayOfWeek);

    let hasAtleastOneSlot = false;
    for (let date of dates) {
      const slots = this._slotGen.generateSlots(newShift, date);
      console.log(slots);
      if (slots.length >= 1) {
        hasAtleastOneSlot = true;
      }
    }

    if (!hasAtleastOneSlot) {
      throw new AppError(
        "Doesnt Have atleast one slot based on values",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }

    // saves doctorShift
    await this._doctorShiftRepo.save(newShift);
  }
}
