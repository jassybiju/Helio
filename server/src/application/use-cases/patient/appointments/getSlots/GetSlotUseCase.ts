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
import {
  CONSULTATION_TYPE,
  SLOT_STATUS,
} from "@domain/common/enums/doctorShift.enum.ts";
import type { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";
import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";
import { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";

export class GetSlotUseCase implements IGetSlotUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorShiftRepo: IDoctorShiftRepository,
    private readonly _blockSlotRepo: IDoctorBlockShiftRepository,
    private readonly _slotService: ISlotGenerator,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async execute(
    doctorId: string,
    patientId?: string
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

    const appointments =
      await this._appointmentRepo.findDoctorAppointmentForRange(
        doctor.id,
        istNow,
        endDate
      );

    let result: IGetSlotDTO = {};

    this._logger.debug("slots", slots);
    // for (const slot of slots) {
    //   if (this.isSlotBlocked(slot, blockedShift)) continue;

    //   if (slot.startTime < istNow) continue;

    //   const dateKey = new Intl.DateTimeFormat("en-CA", {
    //     timeZone: "Asia/Kolkata",
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //   }).format(slot.startTime);
    //   if (!result[dateKey]) {
    //     result[dateKey] = {
    //       clinic: {
    //         slots: [] as { time: string; status: SLOT_STATUS }[],
    //         location: "",
    //       },
    //       online: { slots: [] },
    //     };
    //   }

    //   if (slot.consultationType === CONSULTATION_TYPE.ONLINE) {
    //     const status = this.getSlotStatus(slot, blockedShift, appointments);
    //     result[dateKey]?.online.slots.push({
    //       time: slot.startTime.toISOString(),
    //       status: status,
    //     });
    //   } else if (slot.consultationType == CONSULTATION_TYPE.CLINIC) {
    //     if (result[dateKey]?.clinic.location === "") {
    //       result[dateKey]!.clinic.location = slot.location!;
    //     }
    //     result[dateKey]?.clinic.slots.push({
    //       time: slot.startTime.toISOString(),
    //       status: this.getSlotStatus(slot, blockedShift, appointments),
    //     });
    //   }
    // }

    for (const slot of slots) {
      if (this.isSlotBlocked(slot, blockedShift)) continue;

      const dateKey = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(slot.startTime);

      if (!result[dateKey]) {
        result[dateKey] = {
          clinic: { slots: [], location: "" },
          online: { slots: [] },
        };
      }

      if (slot.consultationType === CONSULTATION_TYPE.ONLINE) {
        const status = this.getSlotStatus(
          slot,
          blockedShift,
          appointments,
          patientId
        );
        result[dateKey]?.online.slots.push({
          time: slot.startTime.toISOString(),
          status,
        });
      } else if (slot.consultationType == CONSULTATION_TYPE.CLINIC) {
        const status = this.getSlotStatus(
          slot,
          blockedShift,
          appointments,
          patientId
        );

        if (result[dateKey]?.clinic.location === "") {
          result[dateKey]!.clinic.location = slot.location!;
        }
        result[dateKey]?.clinic.slots.push({
          time: slot.startTime.toISOString(),
          status,
        });
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

  private getSlotStatus(
    slot: DoctorSlot,
    blockedShifts: DoctorBlockShift[],
    appointments: Appointment[],
    patientId?: string
  ) {
    const isBlocked = blockedShifts.some(
      (block) =>
        slot.startTime < block.endTime && slot.endTime > block.startTime
    );

    if (isBlocked) {
      return SLOT_STATUS.BLOCKED;
    }

    const slotAppointments = appointments.filter(
      (appointment) =>
        appointment.startTime.getTime() === slot.startTime.getTime() &&
        appointment.consultationType === slot.consultationType
    );

    // if current patient already booked this slot
    if (patientId) {
      const alreadyBookedByPatient = slotAppointments.some(
        (appointment) =>
          appointment.patientId === patientId &&
          appointment.status !== APPOINTMENT_STATUS.EXPIRED
      );

      if (alreadyBookedByPatient) {
        return SLOT_STATUS.BOOKED;
      }
    }

    const activeAppointments = slotAppointments.filter(
      (appointment) =>
        appointment.status !== APPOINTMENT_STATUS.CANCELLED &&
        appointment.status !== APPOINTMENT_STATUS.EXPIRED
    );

    if (activeAppointments.length >= slot.capacity) {
      return SLOT_STATUS.BOOKED;
    }

    return SLOT_STATUS.AVAILABLE;
  }
}
