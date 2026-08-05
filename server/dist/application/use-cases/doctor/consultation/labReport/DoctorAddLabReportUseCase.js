import { LabReport } from "#domain/entities/LabReport.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class DoctorAddLabReportUseCase {
    _logger;
    _doctorRepo;
    _appointmentRepo;
    _consultationRepo;
    _labRepo;
    _idGenerator;
    constructor(_logger, _doctorRepo, _appointmentRepo, _consultationRepo, _labRepo, _idGenerator) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._appointmentRepo = _appointmentRepo;
        this._consultationRepo = _consultationRepo;
        this._labRepo = _labRepo;
        this._idGenerator = _idGenerator;
    }
    async execute(doctorId, appointmentId, input) {
        this._logger.info("doctor Lab report request  attempt", {
            doctorId,
            appointmentId,
            input,
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
        const consultation = await this._consultationRepo.findByAppointmentId(appointment.id);
        if (!consultation) {
            throw new NotFoundError(MESSAGE.CONSULTATION_NOT_FOUND);
        }
        const labId = this._idGenerator.generate(process.env.LAB_PREFIX ?? "LAB");
        const labReport = LabReport.create({
            id: labId,
            consultationId: consultation.id,
            doctorId: doctor.id,
            appointmentId: appointment.id,
            testName: input.testName,
            instructions: input.instructions,
            patientId: consultation.patientId,
        });
        await this._labRepo.create(labReport);
    }
}
//# sourceMappingURL=DoctorAddLabReportUseCase.js.map