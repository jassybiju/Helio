import {
  APPOINTMENT_STATUS,
  PAYMENT_STATUS,
} from "@domain/common/enums/appointment.enum.ts";
import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { ConflictError } from "@shared/errors/ConflictError.ts";
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
    private _cancellationReason: string | null,

    private readonly _queueNumber: number,
    private _consultationStartedAt: Date | null,
    private _consultationEndedAt: Date | null,

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

  cancelByDoctor(reason?: string) {
    this.transitionTo(APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED);
    this._cancellationReason = reason ?? null;
  }

  startConsultation() {
    this.transitionTo(APPOINTMENT_STATUS.ONGOING);
    // if (this._paymentStatus === PAYMENT_STATUS.PAID) {
    //   this._paymentStatus = PAYMENT_STATUS.REFUND_PENDING;
    // }
    this._consultationStartedAt = new Date();
  }

  endConsultation() {
    if (this._status !== APPOINTMENT_STATUS.ONGOING) {
      throw new ConflictError("Appointment is not ongoing");
    }
    this._status = APPOINTMENT_STATUS.COMPLETED;
    this._consultationEndedAt = new Date();
  }

  paymentCompleted(paymentId?: string) {
    this._paymentStatus = PAYMENT_STATUS.PAID;

    this.transitionTo(APPOINTMENT_STATUS.CONFIRMED);

    if (paymentId) {
      this._paymentId = paymentId;
    }
  }

  skip(){
    this.transitionTo(APPOINTMENT_STATUS.SKIPPED)
  }

  cancelByDoctorComplete() {
    this.transitionTo(APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR);
  }

  private transitionTo(toStatus: APPOINTMENT_STATUS) {
    if (!Appointment.isValidTransition(this._status, toStatus)) {
      throw new ConflictError(
        `Invalid trnasition from ${this._status} to ${toStatus}`
      );
    }
    this._status = toStatus;
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
    queueNumber,
    rescheduledFromAppointmentId,
    rescheduleReason,
    rescheduledBy,
    rescheduleCount,
  }: {
    appointmentId: string;
    startTime: Date;
    endTime: Date;
    consultationType: CONSULTATION_TYPE;
    consultationFee: number;
    platformFee: number;
    doctorId: string;
    patientId: string;
    queueNumber: number;
    rescheduledFromAppointmentId?: string;
    rescheduleReason?: string;
    rescheduledBy?: USER_ROLES;
    rescheduleCount?: number;
  }) {
    let rescheduledAt = null;
    if (rescheduledFromAppointmentId) {
      rescheduledAt = new Date();
    }
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
      queueNumber,
      null,
      null,
      PAYMENT_STATUS.PENDING,
      null,
      rescheduledFromAppointmentId ?? null,
      rescheduleReason ?? null,
      rescheduledBy ?? null,
      rescheduledAt,
      rescheduleCount ?? null,
      new Date(Date.now() + 5 * 60 * 1000), // expires_at
      new Date(),
      new Date()
    );
  }

  private static _validTransition: Record<
    APPOINTMENT_STATUS,
    APPOINTMENT_STATUS[]
  > = {
    [APPOINTMENT_STATUS.PENDING]: [
      APPOINTMENT_STATUS.EXPIRED,
      APPOINTMENT_STATUS.CONFIRMED,
    ],
    [APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED]: [
      APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR,
    ],
    [APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR]: [],
    [APPOINTMENT_STATUS.CANCELLED_BY_PATIENT]: [],
    [APPOINTMENT_STATUS.COMPLETED]: [],
    [APPOINTMENT_STATUS.CONFIRMED]: [
      APPOINTMENT_STATUS.NO_SHOW,
      APPOINTMENT_STATUS.ONGOING,
      APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED,
      APPOINTMENT_STATUS.CANCELLED_BY_PATIENT,
      APPOINTMENT_STATUS.SKIPPED
    ],
    [APPOINTMENT_STATUS.EXPIRED]: [],
    [APPOINTMENT_STATUS.NO_SHOW]: [],
    [APPOINTMENT_STATUS.ONGOING]: [APPOINTMENT_STATUS.COMPLETED],
    [APPOINTMENT_STATUS.SKIPPED]: [APPOINTMENT_STATUS.ONGOING, APPOINTMENT_STATUS.NO_SHOW],
  };

  static isValidTransition(
    fromStatus: APPOINTMENT_STATUS,
    toStatus: APPOINTMENT_STATUS
  ): boolean {
    return this._validTransition[fromStatus].includes(toStatus);
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
  get queueNumber() {
    return this._queueNumber;
  }
  get consultationStartedAt() {
    return this._consultationStartedAt;
  }

  get consultationEndedAt() {
    return this._consultationEndedAt;
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
