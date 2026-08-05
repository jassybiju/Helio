import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class ChangePasswordUseCase {
    _logger;
    _patientRepo;
    _passwordService;
    _patientValidator;
    constructor(_logger, _patientRepo, _passwordService, _patientValidator) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._passwordService = _passwordService;
        this._patientValidator = _patientValidator;
    }
    async execute(userId, oldPassword, newPassword) {
        this._logger.info("Change Password Patient attempt", {
            userId,
            oldPassword,
            newPassword,
        });
        const patient = await this._patientRepo.findById(userId);
        if (!patient) {
            throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        await this._patientValidator.validatePatientPassword(patient, oldPassword);
        patient.updatePassword(await this._passwordService.hash(newPassword));
        this._patientRepo.update(patient);
    }
}
//# sourceMappingURL=ChangePasswordUseCase.js.map