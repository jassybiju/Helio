import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class GetDoctorUseCase {
    _logger;
    _doctorRepo;
    _fileUpload;
    _appointmentRepo;
    constructor(_logger, _doctorRepo, _fileUpload, _appointmentRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._fileUpload = _fileUpload;
        this._appointmentRepo = _appointmentRepo;
    }
    async execute(doctorId) {
        this._logger.info("Get doctor attempt by admin", { doctorId });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new AppError("Doctor Not found", HTTPStatus.NOT_FOUND);
        }
        const documentUrl = doctor.documentKey
            ? this._fileUpload.getFileUrl(doctor.documentKey, true)
            : null;
        const verificationHistory = doctor.verificationHistory.map((his) => ({
            status: his.status,
            reason: his.reason,
            documentUrl: his.documentKey
                ? this._fileUpload.getFileUrl(his.documentKey, true)
                : null,
            actedAt: his.actedAt.toISOString(),
        }));
        const { totalAppointments, appointmentStatusDistribution } = await this._appointmentRepo.getDoctorAppointmentStatusDistribution(doctor.id);
        return {
            doctor,
            documentUrl,
            verificationHistory,
            totalAppointments,
            appointmentStatusDistribution,
        };
    }
}
//# sourceMappingURL=GetDoctorUseCase.js.map