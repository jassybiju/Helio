import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class AddPatientAllergenUseCase {
    _logger;
    _patientRepo;
    _idGenerator;
    constructor(_logger, _patientRepo, _idGenerator) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._idGenerator = _idGenerator;
    }
    async execute(patientId, allergen, severity) {
        this._logger.info("Add Allergen Attempt", { patientId, allergen });
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        patient.addAllergen({
            _id: this._idGenerator.generate(process.env.ALLERGEN_PREFIX),
            allergen,
            severity,
        });
        await this._patientRepo.update(patient);
    }
}
//# sourceMappingURL=AddPatientAllergenUseCase.js.map