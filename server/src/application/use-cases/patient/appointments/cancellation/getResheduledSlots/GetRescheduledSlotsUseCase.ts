import type { IGetRescheduledSlotsUseCase } from "@application/ports/use-cases/patient/appointments/cancellation/IGetRescheduledSlotsUseCase.ts";
import type { IGetRescheduledSlotsDTO } from "./IGetRescheduledSlotsDTO.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { th } from "zod/locales";
import { ConflictError } from "@shared/errors/ConflictError.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { IDoctorBlockShiftRepository } from "@application/ports/repositories/IDoctorBlockShiftRepository.ts";
import type { ISlotGenerator } from "@application/ports/services/ISlotGenerator.ts";
import type { IGetSlotDTO } from "../../getSlots/IGetSlotDTO.ts";
import type { DoctorSlot } from "@domain/value-objects/DoctorSlot.ts";
import type { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import {
  CONSULTATION_TYPE,
  SLOT_STATUS,
} from "@domain/common/enums/doctorShift.enum.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";
import { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";

export class GetRescheduledSlotsUseCase implements IGetRescheduledSlotsUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _doctorShiftRepo: IDoctorShiftRepository,
    private readonly _blockSlotRepo: IDoctorBlockShiftRepository,
    private readonly _slotService: ISlotGenerator
  ) {}
  async execute(
    patientId: string,
    appointmentId: string
  ): Promise<IGetRescheduledSlotsDTO> {
    this._logger.info("Get Rescheduled Slots Attempt", {
      patientId,
      appointmentId,
    });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
    }

    const appointment = await this._appointmentRepo.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    if (appointment.patientId !== patient.id) {
      throw new ConflictError(MESSAGE.APPOINTMENT_NOT_ACCESS);
    }

    const doctor = await this._doctorRepo.findById(appointment.doctorId);

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const istNow = new Date();
    const endDate = new Date(istNow);

    endDate.setDate(endDate.getDate() + 7);

    const shifts = await this._doctorShiftRepo.findAllByDoctorId(doctor.id);

    const blockedShifts = await this._blockSlotRepo.findByDoctorFromRange(
      doctor.id,
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

    let result: IGetRescheduledSlotsDTO["slots"] = {};

    for (const slot of slots) {
      if (this.isSlotBlocked(slot, blockedShifts)) continue;

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
          blockedShifts,
          appointments,
          patientId
        );

        result[dateKey]?.online.slots.push({
          time: slot.startTime.toISOString(),
          status,
        });
      } else if (slot.consultationType === CONSULTATION_TYPE.CLINIC) {
        const status = this.getSlotStatus(
          slot,
          blockedShifts,
          appointments,
          patientId
        );

        if (result[dateKey]?.clinic.location == "") {
          result[dateKey].clinic.location = slot.location!;
        }
        result[dateKey]?.clinic.slots.push({
          time: slot.startTime.toISOString(),
          status,
        });
      }
    }
    return {
      slots: result,
      doctor: {
        name: doctor.fullName,
        specialty: doctor.specialization,
        id: doctor.id,
      },
    };
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
        appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR &&
        appointment.status !== APPOINTMENT_STATUS.EXPIRED &&
        appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_PATIENT
    );

    if (activeAppointments.length >= slot.capacity) {
      return SLOT_STATUS.BOOKED;
    }

    return SLOT_STATUS.AVAILABLE;
  }
}
