import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type {
  IDoctorSlotFilters,
  IDoctorSlotRepository,
} from "@application/ports/repositories/IDoctorSlotRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetDoctorWeeklySlotsUseCase } from "@application/ports/use-cases/doctor/slot/IGetDoctorWeeklySlotsUseCase.ts";
import type { DoctorSlot } from "@domain/entities/DoctorSlot.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { IGroupedSlots } from "./IGetDoctorWeeklySlotsDTO.ts";

export class GetDoctorWeeklySlotsUsecase implements IGetDoctorWeeklySlotsUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorSlotRepo: IDoctorSlotRepository
  ) {}
  async execute(
    doctorId: string,
    params: IDoctorSlotFilters
  ): Promise<Record<string, IGroupedSlots[]>> {
    this._logger.info("Get Doctor Slots Attempt", { doctorId });
    const { page, limit } = params;
    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    if (!doctor.canAccessPlatform()) {
      throw new AppError(MESSAGE.INVALID_REQUEST, HTTPStatus.FORBIDDEN);
    }

    const today = new Date();
    const { slots, totalCount } = await this._doctorSlotRepo.findAllWithFilters(
      doctorId,
      {
        page,
        sort: "day",
        order: "asc",
        dateFrom: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
          0
        ),
      }
    );
    console.log(slots.map((x) => x.startTime));
    const groupSlots = this.groupSlots(slots);

    return groupSlots.reduce((acc: Record<string, IGroupedSlots[]>, cur) => {
      const day = cur.startTime.toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (acc[day]) {
        acc[day].push(cur);
      } else {
        acc[day] = [cur];
      }
      return acc;
    }, {});
  }

  private groupSlots = (slots: DoctorSlot[]) => {
    const map = new Map<string, IGroupedSlots>();

    for (const slot of slots) {
      const key = `${slot.shiftId}_${slot.startTime.toISOString()}`;

      if (!map.has(key)) {
        map.set(key, {
          shiftId: slot.shiftId,
          startTime: slot.startTime,
          endTime: slot.endTime,
          slots: [
            {
              appointmentId: slot.appointmentId,
              status: slot.status,
              id: slot.slotId,
            },
          ],
        });
      } else {
        map.get(key)!.slots.push({
          appointmentId: slot.appointmentId,
          status: slot.status,
          id: slot.slotId,
        });
      }
    }
    return Array.from(map.values());
  };
}
