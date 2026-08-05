import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class DoctorRemoveLabReportUseCase {
    _logger;
    _doctorRepo;
    _appointmentRepo;
    _labRepo;
    constructor(_logger, _doctorRepo, _appointmentRepo, _labRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._appointmentRepo = _appointmentRepo;
        this._labRepo = _labRepo;
    }
    async execute(doctorId, appointmentId, labId) {
        this._logger.info("remove doctor Lab report request  attempt", {
            doctorId,
            appointmentId,
            labId,
        });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const appointment = await this._appointmentRepo.findById(appointmentId);
        if (!appointment) {
            throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
        }
        if (appointment.doctorId !== doctorId) {
            throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
        }
        const lab = await this._labRepo.findById(labId);
        if (!lab) {
            throw new NotFoundError("Lab Report Not Found");
        }
        if (lab.appointmentId !== appointment.id) {
            throw new ForbiddenError("Lab report can't access");
        }
        await this._labRepo.delete(lab.id);
    }
}
//# sourceMappingURL=DoctorRemoveLabReportUseCase.js.map