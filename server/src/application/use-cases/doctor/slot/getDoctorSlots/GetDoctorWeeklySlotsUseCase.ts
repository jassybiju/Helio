import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IDoctorSlotFilters } from "@application/ports/repositories/IDoctorSlotRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetDoctorWeeklySlotsUseCase } from "@application/ports/use-cases/doctor/slot/IGetDoctorWeeklySlotsUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { ISlotGenerator } from "@application/ports/services/ISlotGenerator.ts";
import type { DoctorSlot } from "@domain/value-objects/DoctorSlot.ts";
import type { IDoctorBlockShiftRepository } from "@application/ports/repositories/IDoctorBlockShiftRepository.ts";
import type { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import { utcToIst } from "@shared/utils/date.utils.ts";
import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";

type SlotWithUnits = DoctorSlot;

export class GetDoctorWeeklySlotsUsecase implements IGetDoctorWeeklySlotsUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorShiftRepo: IDoctorShiftRepository,
    private readonly _slotService: ISlotGenerator,
    private readonly _blockSlotRepo: IDoctorBlockShiftRepository,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async execute(
    doctorId: string,
    _params: IDoctorSlotFilters
  ): Promise<Record<string, SlotWithUnits[]>> {
    this._logger.info("Get Doctor Slots Attempt", { doctorId });
    // const { page, limit } = params;

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    if (!doctor.canAccessPlatform()) {
      throw new AppError(MESSAGE.INVALID_REQUEST, HTTPStatus.FORBIDDEN);
    }

    const istNow = new Date();
    const endDate = new Date(istNow);
    endDate.setDate(endDate.getDate() + 7);

    // get weekly schedule
    const shifts = await this._doctorShiftRepo.findAllByDoctorId(doctor.id);

    const blockedShifts = await this._blockSlotRepo.findByDoctorFromRange(
      doctorId,
      istNow,
      endDate
    );

    const appointments = await this._appointmentRepo.findActiveInRange(
      doctorId,
      istNow,
      endDate
    );
    // generate slots for a week
    const slots = this._slotService.generateSlotsFromRange(
      shifts,
      istNow,
      endDate
    );

    const slotMap = new Map<string, Appointment[]>();

    for (const appt of appointments) {
      const key = appt.startTime.toISOString();
      if (!slotMap.has(key)) {
        slotMap.set(key, []);
      }
      slotMap.get(key)!.push(appt);
    }
    let result: Record<string, SlotWithUnits[]> = {};

    for (const slot of slots) {
      if (this.isSlotBlocked(slot, blockedShifts)) {
        continue;
      }
      const slotKey = slot.startTime.toISOString();
      const key = utcToIst(slot.startTime).toLocaleDateString("en-US", {
        weekday: "long",
      });
      const appts = slotMap.get(slotKey) || [];
      const shift = shifts.find((s) => slot.shiftId === s.shiftId);

      const capacity = shift?.capacityPerSlot ?? 1;

      const activeAppointments = appts.filter(
        (appt) =>
          appt.status !== APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR &&
          appt.status !== APPOINTMENT_STATUS.CANCELLED_BY_PATIENT &&
          appt.status !== APPOINTMENT_STATUS.EXPIRED
      );

      slot.setCapacity(capacity);
      slot.setBookedCount(activeAppointments.length);

      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(slot);
    }
    return result;
  }

  private isSlotBlocked(slot: DoctorSlot, blockedShifts: DoctorBlockShift[]) {
    return blockedShifts.some((block) =>
      slot.overlaps(block.startTime, block.endTime)
    );
  }
}
