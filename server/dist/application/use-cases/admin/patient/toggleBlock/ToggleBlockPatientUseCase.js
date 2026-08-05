import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class ToggleBlockPatientUseCase {
    _logger;
    _patientRepo;
    constructor(_logger, _patientRepo) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
    }
    async execute(userId) {
        this._logger.info("Toggle Block patient attempt", { userId });
        const patient = await this._patientRepo.findById(userId);
        if (!patient) {
            throw new AppError("User not found", HTTPStatus.NOT_FOUND);
        }
        if (!patient.isProfileComplete()) {
            throw new AppError("Patient profile not completed", HTTPStatus.NOT_FOUND);
        }
        patient.toogleBlockStatus();
        await this._patientRepo.update(patient);
    }
}
//# sourceMappingURL=ToggleBlockPatientUseCase.js.map