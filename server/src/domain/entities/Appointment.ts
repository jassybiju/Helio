import { DoctorValidator } from "@application/validators/DoctorValidator.ts";
import {
  APPOINTMENT_STATUS,
  PAYMENT_STATUS,
} from "@domain/common/enums/appointment.enum.ts";
import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class Appointment {
  constructor(
    private readonly _id: string,
    private readonly _doctorId: string,
    private readonly _patientId: string,

    private readonly _startTime: Date,
    private readonly _endTime: Date,

    private readonly _consultationType: CONSULTATION_TYPE,
    private readonly _consultationFee: number,
    private readonly _totalAmount: number,
    private readonly _platformFee: number,

    private _status: APPOINTMENT_STATUS,
    private readonly _cancellationReason: string | null,

    private _paymentStatus: PAYMENT_STATUS,
    private _paymentId: string | null,

    private readonly _rescheduledFromAppointmentId: string | null,
    private readonly _rescheduleReason: string | null,
    private readonly _rescheduleBy: Omit<USER_ROLES, "ADMIN"> | null,
    private readonly _rescheduledAt: Date | null,
    private readonly _rescheduledCount: number | null,

    private readonly _expiresAt: Date,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date
  ) {
    if (!this._startTime || !this._endTime) {
      throw new AppError(
        "Invalid Start Time and endTime",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }
    // if (this._startTime < new Date()) {
    //   throw new AppError(
    //     "Cannot book past slot",
    //     HTTPStatus.UNPROCESSBLE_ENTITY
    //   );
    // }
  }

  paymentCompleted(paymentId?: string) {
    this._paymentStatus = PAYMENT_STATUS.PAID;

    this._status = APPOINTMENT_STATUS.CONFIRMED;

    if (paymentId) {
      this._paymentId = paymentId;
    }
  }

  static create({
    appointmentId,
    doctorId,
    patientId,
    startTime,
    endTime,
    consultationType,
    consultationFee,
    platformFee,
  }: {
    appointmentId: string;
    startTime: Date;
    endTime: Date;
    consultationType: CONSULTATION_TYPE;
    consultationFee: number;
    platformFee: number;
    doctorId: string;
    patientId: string;
  }) {
    return new Appointment(
      appointmentId,
      doctorId,
      patientId,
      startTime,
      endTime,
      consultationType,
      consultationFee,
      consultationFee + platformFee,
      platformFee,
      APPOINTMENT_STATUS.PENDING,
      null,
      PAYMENT_STATUS.PENDING,
      null,
      null,
      null,
      null,
      null,
      null,
      new Date(Date.now() + 5 * 60 * 1000), // expires_at
      new Date(),
      new Date()
    );
  }

  get id() {
    return this._id;
  }
  get doctorId() {
    return this._doctorId;
  }
  get patientId() {
    return this._patientId;
  }
  get startTime() {
    return this._startTime;
  }
  get endTime() {
    return this._endTime;
  }
  get consultationType() {
    return this._consultationType;
  }
  get consultationFee() {
    return this._consultationFee;
  }
  get platformFee() {
    return this._platformFee;
  }
  get totalAmount() {
    return this._totalAmount;
  }
  get status() {
    return this._status;
  }
  get cancellationReason() {
    return this._cancellationReason;
  }
  get paymentStatus() {
    return this._paymentStatus;
  }
  get paymentId() {
    return this._paymentId;
  }
  get rescheduledFromAppointmentId() {
    return this._rescheduledFromAppointmentId;
  }
  get rescheduleReason() {
    return this._rescheduleReason;
  }
  get rescheduledBy() {
    return this._rescheduleBy;
  }
  get rescheduledAt() {
    return this._rescheduledAt;
  }
  get rescheduleCount() {
    return this._rescheduledCount;
  }
  get expiresAt() {
    return this._expiresAt;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
