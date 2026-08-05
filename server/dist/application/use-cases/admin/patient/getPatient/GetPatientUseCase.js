import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { GetPatientMapper } from "./GetPatientMapper.js";
export class GetPatientUseCase {
    _logger;
    _patientRepo;
    _appointmentRepo;
    constructor(_logger, _patientRepo, _appointmentRepo) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._appointmentRepo = _appointmentRepo;
    }
    async execute(patientId) {
        this._logger.info("Get Patient Attempt", { patientId });
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new AppError("Patient Not found", HTTPStatus.NOT_FOUND);
        }
        const appointments = await this._appointmentRepo.findManyWithFilters({
            patientId: patient.id,
            limit: 5,
            order: "desc",
        });
        return GetPatientMapper.toDto(patient, appointments.appointments, appointments.totalCount);
    }
}
//# sourceMappingURL=GetPatientUseCase.js.map