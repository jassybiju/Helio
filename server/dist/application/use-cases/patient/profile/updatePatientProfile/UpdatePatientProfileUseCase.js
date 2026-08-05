import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class UpdatePatientProfileUseCase {
    _logger;
    _patientRepo;
    constructor(_logger, _patientRepo) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
    }
    async execute(input) {
        this._logger.info("Patient Profile Update attempt", input);
        const patient = await this._patientRepo.findById(input.patientId);
        if (!patient) {
            throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        patient.updateProfile({
            firstName: input.firstName,
            lastName: input.lastName,
            bloodGroup: input.bloodGroup,
            gender: input.gender,
            phone: input.phone,
            dob: input.dob,
        });
        await this._patientRepo.update(patient);
    }
}
//# sourceMappingURL=UpdatePatientProfileUseCase.js.map