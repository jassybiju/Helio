import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { INotificationService } from "#application/ports/services/INotificationService.js";
import type { ISlotGenerator } from "#application/ports/services/ISlotGenerator.js";

import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import {
  CONSULTATION_TYPE,
  SLOT_STATUS,
} from "#domain/common/enums/doctorShift.enum.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";

import { Appointment } from "#domain/entities/Appointment.js";
import type { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import type { DoctorSlot } from "#domain/value-objects/DoctorSlot.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { ValidationError } from "#shared/errors/ValidationError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

import { istToUtc, jsToEnumDay, utcToIst } from "#shared/utils/date.utils.js";
import type { DoctorOption, SlotOption } from "../graph/chat/chat.state.js";

// import type {
//   DoctorOption,
//   SlotOption,
//   ConsultationType,
// } from "../graph/chat/chat.state.js";

export class SlotUnavailableError extends Error {
  constructor(message = "The requested slot is no longer available.") {
    super(message);
    this.name = "SlotUnavailableError";
  }
}

/* -------------------------------------------------------------------------- */
/* SPECIALTIES                                                               */
/* -------------------------------------------------------------------------- */

export function createGetPlatformSpecialties(
  specialtyRepo: ISpecialityRepository
) {
  return async function (): Promise<string[]> {
    const specialties = await specialtyRepo.findAllActive();

    return specialties.map((specialty) => specialty.name);
  };
}

/* -------------------------------------------------------------------------- */
/* DOCTOR SEARCH                                                             */
/* -------------------------------------------------------------------------- */

export function createSearchDoctorsBySpecialty(doctorRepo: IDoctorRepository) {
  return async function (specialty: string): Promise<DoctorOption[]> {
    // This should be a specialty-specific repository method.
    const doctors = await doctorRepo.searchByName(specialty);

    return doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.fullName,
      specialty: doctor.specialization ?? specialty,
    }));
  };
}

export function createSearchDoctorByName(doctorRepo: IDoctorRepository) {
  return async function (name: string): Promise<DoctorOption[]> {
    const doctors = await doctorRepo.searchByName(name);

    return doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.fullName,
      specialty: doctor.specialization ?? "",
    }));
  };
}

/* -------------------------------------------------------------------------- */
/* AVAILABLE DATES                                                           */
/* -------------------------------------------------------------------------- */

export function createGetAvailableDates(
  doctorShiftRepo: IDoctorShiftRepository,
  doctorBlockShiftRepo: IDoctorBlockShiftRepository,
  appointmentRepo: IAppointmentRepository,
  slotService: ISlotGenerator
) {
  return async function (doctorId: string): Promise<string[]> {
    const now = new Date();

    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + 7);

    const [shifts, blockedShifts, appointments] = await Promise.all([
      doctorShiftRepo.findAllByDoctorId(doctorId),

      doctorBlockShiftRepo.findByDoctorFromRange(doctorId, now, endDate),

      appointmentRepo.findDoctorAppointmentForRange(doctorId, now, endDate),
    ]);

    const slots = slotService.generateSlotsFromRange(shifts, now, endDate);

    return getBookableDates(slots, blockedShifts, appointments);
  };
}

/* -------------------------------------------------------------------------- */
/* SPECIFIC SLOT                                                             */
/* -------------------------------------------------------------------------- */

export function createGetAvailableSlots(
  doctorShiftRepo: IDoctorShiftRepository,
  doctorBlockShiftRepo: IDoctorBlockShiftRepository,
  appointmentRepo: IAppointmentRepository,
  slotService: ISlotGenerator
) {
  return async function (
    doctorId: string,
    date: string
  ): Promise<SlotOption[]> {
    const { start, end } = getISTDayRange(date);
    console.log("STARTN AND END", { start, end });
    const [shifts, blockedShifts, appointments] = await Promise.all([
      doctorShiftRepo.findAllByDoctorId(doctorId),

      doctorBlockShiftRepo.findByDoctorFromRange(doctorId, start, end),

      appointmentRepo.findDoctorAppointmentForRange(doctorId, start, end),
    ]);

    const slots = slotService.generateSlotsFromRange(shifts, start, end);

    return slots
      .filter((slot) => {
        const blocked = blockedShifts.some((block) =>
          intersects(
            slot.startTime,
            slot.endTime,
            block.startTime,
            block.endTime
          )
        );

        if (blocked) {
          return false;
        }

        return getSlotStatus(slot, appointments) === SLOT_STATUS.AVAILABLE;
      })
      .map((slot) => ({
        time: utcToIst(slot.startTime).toISOString(),
        type: slot.consultationType,
        status: SLOT_STATUS.AVAILABLE,
      }));
  };
}
/* -------------------------------------------------------------------------- */
/* BOOKING                                                                   */
/* -------------------------------------------------------------------------- */

export interface BookAppointmentInput {
  patientId: string;
  doctorId: string;
  dateTime: string;
  consultationType: CONSULTATION_TYPE;
}

export function createBookAppointment(
  appointmentRepo: IAppointmentRepository,
  doctorRepo: IDoctorRepository,
  doctorShiftRepo: IDoctorShiftRepository,
  walletRepo: IWalletRepository,
  transactionRepo: IWalletTransactionRepository,
  idGenerator: IIDGenerator,
  notificationService: INotificationService
) {
  return async function (params: BookAppointmentInput): Promise<string> {
    const istStart = new Date(params.dateTime);

    if (Number.isNaN(istStart.getTime())) {
      throw new AppError(
        "Invalid appointment date-time.",
        HTTPStatus.BAD_REQUEST
      );
    }

    /*
     * 1. Validate doctor
     */
    const doctor = await doctorRepo.findById(params.doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    /*
     * 2. Convert requested UTC time to IST.
     *
     * Shift schedules are interpreted using IST wall-clock time.
     */
    const utcStart = istToUtc(istStart);

    /*
     * 3. Find doctor's shifts for the requested weekday.
     */
    const shifts = await doctorShiftRepo.findAllByDoctorAndDay(
      params.doctorId,
      jsToEnumDay[istStart.getDay()]!
    );

    if (!shifts.length) {
      throw new AppError(
        "No shift available for selected day",
        HTTPStatus.BAD_REQUEST
      );
    }

    /*
     * 4. Find the shift containing this appointment time
     *    and matching the consultation type.
     */
    let matchedShift = null;

    for (const shift of shifts) {
      const shiftStart = shift.startTime.toDate(istStart);
      const shiftEnd = shift.endTime.toDate(istStart);

      if (
        istStart >= shiftStart &&
        istStart < shiftEnd &&
        shift.consultationType === params.consultationType
      ) {
        matchedShift = shift;
        break;
      }
    }

    if (!matchedShift) {
      throw new AppError("Invalid slot selected", HTTPStatus.BAD_REQUEST);
    }

    /*
     * 5. Verify that the requested time aligns
     *    with the shift's slot interval.
     */
    const shiftStart = matchedShift.startTime.toDate(istStart);

    const diff = (istStart.getTime() - shiftStart.getTime()) / (1000 * 60);

    if (diff % matchedShift.slotIntervalInMinutes !== 0) {
      throw new AppError("Invalid slot interval", HTTPStatus.BAD_REQUEST);
    }

    /*
     * 6. Check current slot capacity.
     */
    const count = await appointmentRepo.countOccupiedSlots(
      doctor.id,
      utcStart,
      params.consultationType
    );

    if (count >= matchedShift.capacityPerSlot) {
      throw new AppError("Slot is full", HTTPStatus.BAD_REQUEST);
    }

    /*
     * 7. Prevent the same patient from booking
     *    the same doctor/time twice.
     */
    const existing = await appointmentRepo.findExistingPatientAppointment(
      params.patientId,
      params.doctorId,
      utcStart
    );

    if (existing) {
      throw new AppError(
        "You already booked this slot",
        HTTPStatus.BAD_REQUEST
      );
    }

    /*
     * 8. Calculate consultation fee.
     */
    const platformFee = Number(process.env.PLATFORM_FEE);

    if (!Number.isFinite(platformFee)) {
      throw new Error("Invalid PLATFORM_FEE configuration");
    }

    const consultationFee =
      params.consultationType === CONSULTATION_TYPE.CLINIC
        ? doctor.clinicFee
        : doctor.onlineFee;

    /*
     * 9. Generate appointment ID.
     */
    const appointmentId = idGenerator.generate(process.env.AP_PREFIX!);

    /*
     * 10. Calculate appointment end time.
     */
    const endTime = new Date(
      utcStart.getTime() + matchedShift.slotIntervalInMinutes * 60 * 1000
    );

    /*
     * 11. Create domain entity.
     */
    const appointment = Appointment.create({
      appointmentId,
      patientId: params.patientId,
      doctorId: params.doctorId,
      consultationType: params.consultationType,
      consultationFee: consultationFee!,
      startTime: utcStart,
      endTime,
      queueNumber: count,
      platformFee,
    });

    appointment.paymentCompleted();

    const wallet = await walletRepo.findByUserId(params.patientId);

    if (!wallet) {
      throw new NotFoundError(MESSAGE.WALLET_NOT_FOUND);
    }

    if (wallet.balance < consultationFee!) {
      throw new ValidationError("User dont have enough balance");
    }

    wallet.debit(consultationFee!);

    const transaction = WalletTransaction.createTransaction({
      id: idGenerator.generate(process.env.TRANSACTION_PREFIX!),
      walletId: wallet.id,
      amount: consultationFee!,
      type: TRANSACTION_TYPE.DEBIT,
      description: `AI PAYMENT FOR APPOINTMENT ${appointment.id}`,
    });

    transaction.paymentSuccessful();
    /*
     * 12. Persist appointment.
     */
    await Promise.all([
      appointmentRepo.create(appointment),
      transactionRepo.create(transaction),
      walletRepo.update(wallet),
    ]);
    /*
     * 13. Notify doctor.
     *
     * Notification should not determine booking success.
     */
    await notificationService.notify(
      params.doctorId,
      USER_ROLES.DOCTOR,
      `New Appointment created by ${params.patientId}`,
      `Appointment created for ${appointment.startTime.toDateString()}`
    );

    return appointmentId;
  };
}

/* -------------------------------------------------------------------------- */
/* SLOT HELPERS                                                              */
/* -------------------------------------------------------------------------- */

function getSlotStatus(
  slot: DoctorSlot,
  appointments: Appointment[]
): SLOT_STATUS {
  const slotAppointments = appointments.filter(
    (appointment) =>
      appointment.startTime.getTime() === slot.startTime.getTime() &&
      appointment.consultationType === slot.consultationType
  );

  const activeAppointments = slotAppointments.filter(isActiveAppointment);

  return activeAppointments.length >= 1
    ? SLOT_STATUS.BOOKED
    : SLOT_STATUS.AVAILABLE;
}

function isActiveAppointment(appointment: Appointment): boolean {
  return ![
    APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR,
    APPOINTMENT_STATUS.CANCELLED_BY_PATIENT,
    APPOINTMENT_STATUS.EXPIRED,
  ].includes(appointment.status);
}

/* -------------------------------------------------------------------------- */
/* DATE HELPERS                                                              */
/* -------------------------------------------------------------------------- */

const IST_DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function getISTDate(date: Date): string {
  return IST_DATE_FORMATTER.format(date);
}

function getISTDayRange(date: string): {
  start: Date;
  end: Date;
} {
  const [year, month, day] = date.split("-").map(Number);

  /*
   * IST = UTC + 05:30
   *
   * Midnight IST =
   * previous day 18:30 UTC
   */

  const start = new Date(Date.UTC(year!, month! - 1, day!, -5, -30, 0, 0));

  const end = new Date(Date.UTC(year!, month! - 1, day! + 1, -5, -30, 0, 0));

  return {
    start,
    end,
  };
}

function intersects(
  firstStart: Date,
  firstEnd: Date,
  secondStart: Date,
  secondEnd: Date
): boolean {
  return firstStart < secondEnd && firstEnd > secondStart;
}

/* -------------------------------------------------------------------------- */
/* BOOKABLE DATES                                                            */
/* -------------------------------------------------------------------------- */

function getBookableDates(
  slots: DoctorSlot[],
  blockedShifts: DoctorBlockShift[],
  appointments: Appointment[]
): string[] {
  const dates = new Set<string>();

  for (const slot of slots) {
    const blocked = blockedShifts.some((block) =>
      intersects(slot.startTime, slot.endTime, block.startTime, block.endTime)
    );

    if (blocked) {
      continue;
    }

    const status = getSlotStatus(slot, appointments);

    if (status !== SLOT_STATUS.AVAILABLE) {
      continue;
    }

    dates.add(getISTDate(slot.startTime));
  }

  return [...dates].sort();
}

export interface GetConsultationCostInput {
  doctorId: string;
  consultationType: CONSULTATION_TYPE;
}

export interface ConsultationCost {
  consultationFee: number;
  platformFee: number;
  totalAmount: number;
}

export function createGetConsultationCost(doctorRepo: IDoctorRepository) {
  return async function (
    params: GetConsultationCostInput
  ): Promise<ConsultationCost> {
    const doctor = await doctorRepo.findById(params.doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const consultationFee =
      params.consultationType === CONSULTATION_TYPE.ONLINE
        ? doctor.onlineFee
        : doctor.clinicFee;

    const platformFee = Number(process.env.PLATFORM_FEE);

    if (!Number.isFinite(platformFee)) {
      throw new Error("Invalid PLATFORM_FEE configuration");
    }

    return {
      consultationFee: consultationFee ?? 0,
      platformFee,
      totalAmount: (consultationFee ?? 0) + platformFee,
    };
  };
}

export function createGetWalletDetails(walletRepo: IWalletRepository) {
  return async function (patientId: string) {
    const wallet = await walletRepo.findByUserId(patientId);

    if (!wallet) {
      throw new AppError("Wallet not found", HTTPStatus.NOT_FOUND);
    }

    return {
      balance: wallet.balance,
    };
  };
}
