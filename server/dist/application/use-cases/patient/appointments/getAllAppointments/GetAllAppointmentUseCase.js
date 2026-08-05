import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class GetAllAppointmentUseCase {
    _logger;
    _patientRepo;
    _appointmentRepo;
    _doctorRepo;
    _consultationRepo;
    _labRepo;
    _fileUpload;
    constructor(_logger, _patientRepo, _appointmentRepo, _doctorRepo, _consultationRepo, _labRepo, _fileUpload) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._appointmentRepo = _appointmentRepo;
        this._doctorRepo = _doctorRepo;
        this._consultationRepo = _consultationRepo;
        this._labRepo = _labRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(patientId, query) {
        this._logger.info("Get ALlAppointmetn ", { patientId, query });
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
        }
        const { appointments, totalCount } = await this._appointmentRepo.findManyWithFilters({
            patientId: patient.id,
            page: query.page,
            limit: Number(query.limit),
            order: "asc",
            status: query.status ?? null,
        });
        const cancelledAppointments = await this._appointmentRepo.findManyWithFilters({
            patientId: patient.id,
            status: APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED,
        });
        const result = await Promise.all(appointments.map(async (res) => {
            const appointment = res.appointment;
            const doctor = await this._doctorRepo.findById(appointment.doctorId);
            const consultation = await this._consultationRepo.findByAppointmentId(appointment.id);
            const hasLabReports = await this._labRepo.findByAppointmentId(appointment.id);
            return {
                id: appointment.id,
                patientId: appointment.patientId,
                doctor: {
                    id: doctor?.id ?? "",
                    name: doctor?.fullName ?? "Unknown Doctor",
                    specialization: doctor?.specialization ?? "",
                    profilePicture: doctor?.profilePicKey
                        ? this._fileUpload.getFileUrl(doctor.profilePicKey)
                        : null,
                },
                appointment: {
                    startTime: appointment.startTime.toISOString(),
                    endTime: appointment.endTime.toISOString(),
                    consultationType: appointment.consultationType,
                    status: appointment.status,
                    paymentStatus: appointment.paymentStatus,
                    totalAmount: appointment.totalAmount,
                },
                consultation: {
                    exists: !!consultation,
                    completed: !!consultation?.endedAt,
                },
                hasLabReports: !!hasLabReports,
            };
        }));
        return {
            appointments: result,
            cancelledAppointments: cancelledAppointments.appointments.map((app) => app.appointment.id),
            totalCount,
            page: query.page,
            limit: query.limit,
        };
    }
}
//# sourceMappingURL=GetAllAppointmentUseCase.js.map