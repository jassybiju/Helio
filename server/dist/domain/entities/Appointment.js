import { APPOINTMENT_STATUS, PAYMENT_STATUS, } from "#domain/common/enums/appointment.enum.js";
import { AppError } from "#shared/errors/AppError.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class Appointment {
    _id;
    _doctorId;
    _patientId;
    _startTime;
    _endTime;
    _consultationType;
    _consultationFee;
    _totalAmount;
    _platformFee;
    _status;
    _cancellationReason;
    _queueNumber;
    _consultationStartedAt;
    _consultationEndedAt;
    _paymentStatus;
    _paymentId;
    _rescheduledFromAppointmentId;
    _rescheduleReason;
    _rescheduleBy;
    _rescheduledAt;
    _rescheduledCount;
    _expiresAt;
    _createdAt;
    _updatedAt;
    constructor(_id, _doctorId, _patientId, _startTime, _endTime, _consultationType, _consultationFee, _totalAmount, _platformFee, _status, _cancellationReason, _queueNumber, _consultationStartedAt, _consultationEndedAt, _paymentStatus, _paymentId, _rescheduledFromAppointmentId, _rescheduleReason, _rescheduleBy, _rescheduledAt, _rescheduledCount, _expiresAt, _createdAt, _updatedAt) {
        this._id = _id;
        this._doctorId = _doctorId;
        this._patientId = _patientId;
        this._startTime = _startTime;
        this._endTime = _endTime;
        this._consultationType = _consultationType;
        this._consultationFee = _consultationFee;
        this._totalAmount = _totalAmount;
        this._platformFee = _platformFee;
        this._status = _status;
        this._cancellationReason = _cancellationReason;
        this._queueNumber = _queueNumber;
        this._consultationStartedAt = _consultationStartedAt;
        this._consultationEndedAt = _consultationEndedAt;
        this._paymentStatus = _paymentStatus;
        this._paymentId = _paymentId;
        this._rescheduledFromAppointmentId = _rescheduledFromAppointmentId;
        this._rescheduleReason = _rescheduleReason;
        this._rescheduleBy = _rescheduleBy;
        this._rescheduledAt = _rescheduledAt;
        this._rescheduledCount = _rescheduledCount;
        this._expiresAt = _expiresAt;
        this._createdAt = _createdAt;
        this._updatedAt = _updatedAt;
        if (!this._startTime || !this._endTime) {
            throw new AppError("Invalid Start Time and endTime", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
        // if (this._startTime < new Date()) {
        //   throw new AppError(
        //     "Cannot book past slot",
        //     HTTPStatus.UNPROCESSBLE_ENTITY
        //   );
        // }
    }
    cancelByDoctor(reason) {
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
    paymentCompleted(paymentId) {
        this._paymentStatus = PAYMENT_STATUS.PAID;
        this.transitionTo(APPOINTMENT_STATUS.CONFIRMED);
        if (paymentId) {
            this._paymentId = paymentId;
        }
    }
    skip() {
        this.transitionTo(APPOINTMENT_STATUS.SKIPPED);
    }
    cancelByPatientComplete() {
        this.transitionTo(APPOINTMENT_STATUS.CANCELLED_BY_PATIENT);
    }
    cancelByDoctorComplete() {
        this.transitionTo(APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR);
    }
    transitionTo(toStatus) {
        if (!Appointment.isValidTransition(this._status, toStatus)) {
            throw new ConflictError(`Invalid trnasition from ${this._status} to ${toStatus}`);
        }
        this._status = toStatus;
    }
    static create({ appointmentId, doctorId, patientId, startTime, endTime, consultationType, consultationFee, platformFee, queueNumber, rescheduledFromAppointmentId, rescheduleReason, rescheduledBy, rescheduleCount, }) {
        let rescheduledAt = null;
        if (rescheduledFromAppointmentId) {
            rescheduledAt = new Date();
        }
        return new Appointment(appointmentId, doctorId, patientId, startTime, endTime, consultationType, consultationFee, consultationFee + platformFee, platformFee, APPOINTMENT_STATUS.PENDING, null, queueNumber, null, null, PAYMENT_STATUS.PENDING, null, rescheduledFromAppointmentId ?? null, rescheduleReason ?? null, rescheduledBy ?? null, rescheduledAt, rescheduleCount ?? null, new Date(Date.now() + 5 * 60 * 1000), // expires_at
        new Date(), new Date());
    }
    static _validTransition = {
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
            APPOINTMENT_STATUS.SKIPPED,
        ],
        [APPOINTMENT_STATUS.EXPIRED]: [],
        [APPOINTMENT_STATUS.NO_SHOW]: [],
        [APPOINTMENT_STATUS.ONGOING]: [APPOINTMENT_STATUS.COMPLETED],
        [APPOINTMENT_STATUS.SKIPPED]: [
            APPOINTMENT_STATUS.ONGOING,
            APPOINTMENT_STATUS.NO_SHOW,
        ],
    };
    static isValidTransition(fromStatus, toStatus) {
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
//# sourceMappingURL=Appointment.js.map