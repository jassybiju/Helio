import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class RemovePatientConditionUseCase {
    _logger;
    _patientRepo;
    constructor(_logger, _patientRepo) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
    }
    async execute(patientId, conditionId) {
        this._logger.info("Patient Condition Remove attempt", {
            patientId,
            conditionId,
        });
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        patient.removeCondition(conditionId);
        this._patientRepo.update(patient);
    }
}
//# sourceMappingURL=RemovePatientConditionUseCase.js.map