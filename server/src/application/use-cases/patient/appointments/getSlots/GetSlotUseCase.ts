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
      page?: number | undefined;
      limit?: number | undefined;
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
    this._logger.info("Get Slot Attempt", { doctorId, reviewInput });

    const doctor = await this._doctorRepo.findById(doctorId);
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
    const reviews = await this._reviewRepo.findManyByDoctorIdPaginated(
      doctor.id,
      reviewInput?.page ?? 1,
      reviewInput?.limit ?? 5
    );
    const patients = await this._patientRepo.findByIds([
      ...new Set(reviews.map((review) => review.patientId)),
    ]);
    const totalReviews = await this._reviewRepo.countRatingsByDoctorId(
      doctor.id
    );

    const profilePic = doctor.profilePicKey
      ? this._fileUpload.getFileUrl(doctor.profilePicKey)
      : null;
    return {
      slots: result,
      doctor: {
        doctorId: doctor.id,
        fullName: doctor.fullName,
        speciality: doctor.specialization,
        clinicFee: doctor.clinicFee,
        onlineFee: doctor.onlineFee,
        profilePic: profilePic,
        yearsOfExperience: doctor.yearsOfExperience,
      },
      reviews: reviews.map((review) => {
        const patient = patients.find((p) => p.id === review.patientId);

        return {
          id: review.id,
          comments: review.comments,
          patientName: patient?.fullName ?? "No Name",
          profilePic: patient?.profilePicKey
            ? this._fileUpload.getFileUrl(patient.profilePicKey)
            : null,
          ratings: review.rating,
          createdAt: review.createdAt,
        };
      }),
      totalReviews,
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
