import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { DoctorViewAllAppointmentMapper } from "./DoctorViewAllAppointmentMapper.js";
export class DoctorViewAllAppointmentUseCase {
    _logger;
    _doctorRepo;
    _appointmentRepo;
    constructor(_logger, _doctorRepo, _appointmentRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._appointmentRepo = _appointmentRepo;
    }
    async execute(doctorId, input) {
        this._logger.info("Doctor View All Appointment Attempt", {
            doctorId,
            input,
        });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const { date, search, status, type, page, limit } = input;
        let startDate;
        let endDate;
        if (date) {
            startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
        }
        const { appointments, totalCount } = await this._appointmentRepo.findManyWithFilters({
            doctorId,
            page,
            limit,
            patientSearch: search ?? null,
            order: "asc",
            status: status ?? null,
            consultationType: type ?? null,
            startDate: startDate ?? null,
            endDate: endDate ?? null,
        });
        return {
            pagination: { page: page, limit: limit, totalCount },
            data: DoctorViewAllAppointmentMapper.toDto(appointments),
        };
    }
}
//# sourceMappingURL=DoctorViewAllAppointmentUseCase.js.map