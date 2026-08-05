import { Vital } from "#domain/value-objects/Vitals.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class DoctorUpdateVitalsUseCase {
    _logger;
    _doctorRepo;
    _consultationRepo;
    _appointmentRepo;
    constructor(_logger, _doctorRepo, _consultationRepo, _appointmentRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._consultationRepo = _consultationRepo;
        this._appointmentRepo = _appointmentRepo;
    }
    async execute(doctorId, appointmentId, data) {
        this._logger.info("Doctor Update vitals attempt", {
            doctorId,
            appointmentId,
            data,
        });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const appointment = await this._appointmentRepo.findById(appointmentId);
        if (!appointment) {
            throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
        }
        const consultation = await this._consultationRepo.findByAppointmentId(appointment.id);
        if (!consultation) {
            throw new NotFoundError(MESSAGE.CONSULTATION_NOT_FOUND);
        }
        if (consultation.doctorId !== doctor.id) {
            throw new ForbiddenError(MESSAGE.CONSULTATION_NOT_ACCESS);
        }
        consultation.ensureActive();
        const vital = new Vital(data.bloodPressure, data.oxygenLevel, data.heartRate, data.temperature, data.weight, data.height);
        consultation.addVitals(vital);
        await this._consultationRepo.update(consultation);
    }
}
//# sourceMappingURL=DoctorUpdateVitalsUseCase.js.map