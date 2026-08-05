import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { jsToEnumDay, utcToIst } from "#shared/utils/date.utils.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import { Appointment } from "#domain/entities/Appointment.js";
import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class RespondPatientResheduleAppointmentUseCase {
    _logger;
    _appointmentRepo;
    _patientRepo;
    _doctorRepo;
    _doctorShiftRepo;
    _idGenerator;
    _uow;
    constructor(_logger, _appointmentRepo, _patientRepo, _doctorRepo, _doctorShiftRepo, _idGenerator, _uow) {
        this._logger = _logger;
        this._appointmentRepo = _appointmentRepo;
        this._patientRepo = _patientRepo;
        this._doctorRepo = _doctorRepo;
        this._doctorShiftRepo = _doctorShiftRepo;
        this._idGenerator = _idGenerator;
        this._uow = _uow;
    }
    async execute(patientId, appointmentId, data) {
        this._logger.info("Patient Reshedule Appointment Attempt", {
            patientId,
            appointmentId,
            data,
        });
        return this._uow.execute(async (session) => {
            const patientRepo = this._patientRepo.withSession(session);
            const appointmentRepo = this._appointmentRepo.withSession(session);
            const doctorRepo = this._doctorRepo.withSession(session);
            const doctorShiftRepo = this._doctorShiftRepo.withSession(session);
            const patient = await patientRepo.findById(patientId);
            if (!patient) {
                throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
            }
            const appointment = await appointmentRepo.findById(appointmentId);
            if (!appointment) {
                throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
            }
            if (appointment.patientId !== patient.id) {
                throw new ConflictError(MESSAGE.APPOINTMENT_NOT_ACCESS);
            }
            const doctor = await doctorRepo.findById(appointment.doctorId);
            if (!doctor) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            const start = new Date(data.startTime);
            const istStart = utcToIst(start);
            const shifts = await doctorShiftRepo.findAllByDoctorAndDay(doctor.id, jsToEnumDay[istStart.getDay()]);
            if (!shifts.length) {
                throw new ConflictError("No Shift Available for selected day");
            }
            let matchedShift = null;
            for (const shift of shifts) {
                const shiftStart = shift.startTime.toDate(istStart);
                const shiftEnd = shift.endTime.toDate(istStart);
                if (istStart >= shiftStart &&
                    istStart < shiftEnd &&
                    shift.consultationType === data.consultationType) {
                    matchedShift = shift;
                    break;
                }
            }
            if (!matchedShift) {
                throw new ConflictError("Invalid Slot Selected");
            }
            const shiftStart = matchedShift.startTime.toDate(istStart);
            const diff = (istStart.getTime() - shiftStart.getTime()) / (1000 * 60);
            if (diff % matchedShift.slotIntervalInMinutes !== 0) {
                throw new ConflictError("Invalid Slot Interval");
            }
            const count = await appointmentRepo.countOccupiedSlots(doctor.id, start, data.consultationType);
            if (count >= matchedShift.capacityPerSlot) {
                throw new ConflictError("Slot is full");
            }
            const existing = await appointmentRepo.findExistingPatientAppointment(patient.id, doctor.id, start);
            if (existing) {
                throw new ConflictError("You aleady booked this slot");
            }
            const PLATFORM_FEE = Number(process.env.PLATFORM_FEE);
            let consultationFee = doctor[data.consultationType === CONSULTATION_TYPE.CLINIC
                ? "clinicFee"
                : "onlineFee"];
            const AP_PREFIX = process.env.AP_PREFIX;
            const APPOINTMENT_ID = this._idGenerator.generate(AP_PREFIX);
            const endTime = new Date(start.getTime() + matchedShift.slotIntervalInMinutes * 60 * 1000);
            const newAppointment = Appointment.create({
                appointmentId: APPOINTMENT_ID,
                patientId,
                doctorId: doctor.id,
                consultationType: data.consultationType,
                consultationFee: consultationFee,
                startTime: start,
                endTime,
                queueNumber: count,
                platformFee: PLATFORM_FEE,
                rescheduleCount: (appointment.rescheduleCount ?? 0) + 1,
                rescheduledBy: appointment.status ===
                    APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED
                    ? USER_ROLES.DOCTOR
                    : USER_ROLES.PATIENT,
                rescheduleReason: appointment.rescheduleReason,
                rescheduledFromAppointmentId: appointment.id,
            });
            newAppointment.paymentCompleted(appointment.paymentId ?? undefined);
            appointment.cancelByDoctorComplete();
            await Promise.all([
                appointmentRepo.update(appointment),
                appointmentRepo.create(newAppointment),
            ]);
        });
    }
}
//# sourceMappingURL=RespondPatientResheduleAppointmentUseCase.js.map