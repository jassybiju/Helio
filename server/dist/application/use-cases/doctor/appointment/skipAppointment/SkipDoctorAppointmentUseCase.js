import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class SkipDoctorAppointmentUseCase {
    _logger;
    _doctorRepo;
    _appointmentRepo;
    constructor(_logger, _doctorRepo, _appointmentRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._appointmentRepo = _appointmentRepo;
    }
    async execute(doctorId, appointmentId) {
        this._logger.info("Skip doctor Appointment usecase", {
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
            throw new ConflictError(MESSAGE.APPOINTMENT_NOT_ACCESS);
        }
        const fakeDate = new Date();
        fakeDate.setDate(fakeDate.getDate() + 1);
        // if (fakeDate < appointment.startTime) {
        //   throw new ConflictError("Appointment can't skipped begore start tiem");
        // }
        if (appointment.status !== APPOINTMENT_STATUS.CONFIRMED) {
            throw new ConflictError("Appointment can't skipped");
        }
        appointment.skip();
        await this._appointmentRepo.update(appointment);
    }
}
//# sourceMappingURL=SkipDoctorAppointmentUseCase.js.map