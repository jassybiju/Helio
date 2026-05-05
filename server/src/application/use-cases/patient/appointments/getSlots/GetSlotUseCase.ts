import type { IGetSlotUseCase } from "@application/ports/use-cases/patient/appointments/IGetSlotUseCase.ts";
import type { IGetSlotDTO } from "./IGetSlotDTO.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { IDoctorBlockShiftRepository } from "@application/ports/repositories/IDoctorBlockShiftRepository.ts";
import type { ISlotGenerator } from "@application/ports/services/ISlotGenerator.ts";
import type { DoctorSlot } from "@domain/value-objects/DoctorSlot.ts";
import { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import type { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";

export class GetSlotUseCase implements IGetSlotUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorShiftRepo: IDoctorShiftRepository,
    private readonly _blockSlotRepo: IDoctorBlockShiftRepository,
    private readonly _slotService: ISlotGenerator
  ) {}
  async execute(
    doctorId: string
  ): Promise<{ slots: IGetSlotDTO; doctor: Doctor }> {
    this._logger.info("Get Slot Attempt", { doctorId });

    const doctor = await this._doctorRepo.findById(doctorId);
    console.log(doctor, 223, doctorId);
    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const istNow = new Date();
    const endDate = new Date(istNow);

    endDate.setDate(endDate.getDate() + 7);

    const shifts = await this._doctorShiftRepo.findAllByDoctorId(doctorId);

    const blockedShift = await this._blockSlotRepo.findByDoctorFromRange(
      doctorId,
      istNow,
      endDate
    );

    const slots = this._slotService.generateSlotsFromRange(
      shifts,
      istNow,
      endDate
    );

    let result: IGetSlotDTO = {};

    for (const slot of slots) {
      if (this.isSlotBlocked(slot, blockedShift)) continue;

      if (slot.startTime < istNow) continue;

      const dateKey = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(slot.startTime);
      if (!result[dateKey]) {
        result[dateKey] = {
          clinic: { times: [] as string[], location: "" },
          online: { times: [] as string[] },
        };
      }

      if (slot.consultationType === CONSULTATION_TYPE.ONLINE) {
        result[dateKey]?.online.times.push(slot.startTime.toISOString());
      } else if (slot.consultationType == CONSULTATION_TYPE.CLINIC) {
        if (result[dateKey]?.clinic.location === "") {
          result[dateKey]!.clinic.location = slot.location!;
        }
        result[dateKey]?.clinic.times.push(slot.startTime.toISOString());
      }
    }

    return { slots: result, doctor };
  }

  private isSlotBlocked(
    slot: DoctorSlot,
    blockedShifts: DoctorBlockShift[]
  ): boolean {
    return blockedShifts.some(
      (block) =>
        slot.startTime < block.endTime && slot.endTime > block.startTime
    );
  }
}
