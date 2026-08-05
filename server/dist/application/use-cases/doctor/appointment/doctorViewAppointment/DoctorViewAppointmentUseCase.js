import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { DoctorViewAppointmentMapper } from "./DoctorViewAppointmentMapper.js";
export class DoctorViewAppointmentUseCase {
    _logger;
    _doctorRepo;
    _appointmentRepo;
    _patientRepo;
    _consultationRepo;
    constructor(_logger, _doctorRepo, _appointmentRepo, _patientRepo, _consultationRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._appointmentRepo = _appointmentRepo;
        this._patientRepo = _patientRepo;
        this._consultationRepo = _consultationRepo;
    }
    async execute(doctorId, appointmentId) {
        this._logger.info("Doctor View Appointment Repo ", {
            doctorId,
            appointmentId,
        });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const appointment = await this._appointmentRepo.findById(appointmentId);
        if (!appointment) {
            throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
        }
        if (appointment.doctorId !== doctor.id) {
            throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
        }
        const patient = await this._patientRepo.findById(appointment.patientId);
        if (!patient) {
            throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
        }
        const consultation = await this._consultationRepo.findByAppointmentId(appointment.id);
        return DoctorViewAppointmentMapper.toDto(appointment, patient, consultation);
    }
}
//# sourceMappingURL=DoctorViewAppointmentUseCase.js.map