import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class RemovePatientAllergenUseCase {
    _logger;
    _patientRepo;
    constructor(_logger, _patientRepo) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
    }
    async execute(patientId, allergenId) {
        this._logger.info("Remove Allergen Request", { patientId, allergenId });
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        patient.removeAllergen(allergenId);
        await this._patientRepo.update(patient);
    }
}
//# sourceMappingURL=RemovePatientAllergenUseCase.js.map