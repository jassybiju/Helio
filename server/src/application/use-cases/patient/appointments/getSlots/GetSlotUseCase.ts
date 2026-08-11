import type { IGetSlotUseCase } from "#application/ports/use-cases/patient/appointments/IGetSlotUseCase.js";
import type { IGetSlotDTO } from "./IGetSlotDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import { AppError } from "#shared/errors/AppError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { IDoctorBlockShiftRepository } from "#application/ports/repositories/IDoctorBlockShiftRepository.js";
import type { ISlotGenerator } from "#application/ports/services/ISlotGenerator.js";
import type { DoctorSlot } from "#domain/value-objects/DoctorSlot.js";
import {
  CONSULTATION_TYPE,
  SLOT_STATUS,
} from "#domain/common/enums/doctorShift.enum.js";
import type { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { Appointment } from "#domain/entities/Appointment.js";
import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import type { IReviewRepository } from "#application/ports/repositories/IReviewRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";

const IST_DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export class GetSlotUseCase implements IGetSlotUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorShiftRepo: IDoctorShiftRepository,
    private readonly _blockSlotRepo: IDoctorBlockShiftRepository,
    private readonly _slotService: ISlotGenerator,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _reviewRepo: IReviewRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _fileUpload: IFileUpload
  ) {}

  async execute(
    doctorId: string,
    patientId: string,
    reviewInput: {
      page?: number;
      limit?: number;
    }
  ): Promise<{
    slots: IGetSlotDTO;
    doctor: {
      fullName: string;
      speciality: string | null;
      onlineFee: number | null;
      clinicFee: number | null;
      yearsOfExperience: number | null;
      doctorId: string;
      profilePic: string | null;
    };
    reviews: {
      id: string;
      patientName: string;
      comments: string;
      ratings: number;
      createdAt: Date;
      profilePic: string | null;
    }[];
    totalReviews: number[];
  }> {
    this._logger.info("Get Slot Attempt", {
      doctorId,
      reviewInput,
    });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const now = new Date();
    const endDate = this.getEndDate(now);

    const [shifts, blockedShifts, appointments] = await Promise.all([
      this._doctorShiftRepo.findAllByDoctorId(doctorId),

      this._blockSlotRepo.findByDoctorFromRange(doctorId, now, endDate),

      this._appointmentRepo.findDoctorAppointmentForRange(
        doctor.id,
        now,
        endDate
      ),
    ]);

    const generatedSlots = this._slotService.generateSlotsFromRange(
      shifts,
      now,
      endDate
    );

    const slots = this.buildSlots(
      generatedSlots,
      blockedShifts,
      appointments,
      patientId
    );

    const reviews = await this._reviewRepo.findManyByDoctorIdPaginated(
      doctor.id,
      reviewInput.page ?? 1,
      reviewInput.limit ?? 5
    );

    const [patients, totalReviews] = await Promise.all([
      this._patientRepo.findByIds([
        ...new Set(reviews.map((review) => review.patientId)),
      ]),

      this._reviewRepo.countRatingsByDoctorId(doctor.id),
    ]);

    const patientsById = new Map(
      patients.map((patient) => [patient.id, patient])
    );

    return {
      slots,

      doctor: {
        doctorId: doctor.id,
        fullName: doctor.fullName,
        speciality: doctor.specialization,
        clinicFee: doctor.clinicFee,
        onlineFee: doctor.onlineFee,
        yearsOfExperience: doctor.yearsOfExperience,
        profilePic: doctor.profilePicKey
          ? this._fileUpload.getFileUrl(doctor.profilePicKey)
          : null,
      },

      reviews: reviews.map((review) => {
        const patient = patientsById.get(review.patientId);

        return {
          id: review.id,
          comments: review.comments,
          patientName: patient?.fullName ?? "No Name",
          ratings: review.rating,
          createdAt: review.createdAt,
          profilePic: patient?.profilePicKey
            ? this._fileUpload.getFileUrl(patient.profilePicKey)
            : null,
        };
      }),

      totalReviews,
    };
  }

  private getEndDate(startDate: Date): Date {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    return endDate;
  }

  private buildSlots(
    slots: DoctorSlot[],
    blockedShifts: DoctorBlockShift[],
    appointments: Appointment[],
    patientId: string
  ): IGetSlotDTO {
    const result: IGetSlotDTO = {};

    for (const slot of slots) {
      if (this.isSlotBlocked(slot, blockedShifts)) {
        continue;
      }

      const dateKey = IST_DATE_FORMATTER.format(slot.startTime);
      const daySlots = this.getOrCreateDay(result, dateKey);

      const status = this.getSlotStatus(slot, appointments, patientId);

      if (slot.consultationType === CONSULTATION_TYPE.ONLINE) {
        daySlots.online.slots.push({
          time: slot.startTime.toISOString(),
          status,
        });

        continue;
      }

      if (slot.consultationType === CONSULTATION_TYPE.CLINIC) {
        if (!daySlots.clinic.location) {
          daySlots.clinic.location = slot.location ?? "";
        }

        daySlots.clinic.slots.push({
          time: slot.startTime.toISOString(),
          status,
        });
      }
    }

    return result;
  }

  private getOrCreateDay(result: IGetSlotDTO, dateKey: string) {
    if (!result[dateKey]) {
      result[dateKey] = {
        clinic: {
          slots: [],
          location: "",
        },
        online: {
          slots: [],
        },
      };
    }

    return result[dateKey]!;
  }

  private isSlotBlocked(
    slot: DoctorSlot,
    blockedShifts: DoctorBlockShift[]
  ): boolean {
    return blockedShifts.some((block) =>
      this.intersects(
        slot.startTime,
        slot.endTime,
        block.startTime,
        block.endTime
      )
    );
  }

  private intersects(
    firstStart: Date,
    firstEnd: Date,
    secondStart: Date,
    secondEnd: Date
  ): boolean {
    return firstStart < secondEnd && firstEnd > secondStart;
  }

  private getSlotStatus(
    slot: DoctorSlot,
    appointments: Appointment[],
    patientId: string
  ): SLOT_STATUS {
    const slotAppointments = appointments.filter(
      (appointment) =>
        appointment.startTime.getTime() === slot.startTime.getTime() &&
        appointment.consultationType === slot.consultationType
    );

    const alreadyBookedByPatient = slotAppointments.some(
      (appointment) =>
        appointment.patientId === patientId &&
        appointment.status !== APPOINTMENT_STATUS.EXPIRED
    );

    if (alreadyBookedByPatient) {
      return SLOT_STATUS.BOOKED;
    }

    const activeAppointments = slotAppointments.filter((appointment) =>
      this.isActiveAppointment(appointment)
    );

    return activeAppointments.length >= slot.capacity
      ? SLOT_STATUS.BOOKED
      : SLOT_STATUS.AVAILABLE;
  }

  private isActiveAppointment(appointment: Appointment): boolean {
    return ![
      APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR,
      APPOINTMENT_STATUS.CANCELLED_BY_PATIENT,
      APPOINTMENT_STATUS.EXPIRED,
    ].includes(appointment.status);
  }
}
