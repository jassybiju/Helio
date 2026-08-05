import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class CompletePatientProfileUseCase {
    _logger;
    _patientRepo;
    constructor(_logger, _patientRepo) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
    }
    async execute(userId, input) {
        this._logger.info("Complete Patient Profile Attempt");
        const { gender, dob, phone } = input;
        const patient = await this._patientRepo.findById(userId);
        if (!patient) {
            throw new AppError("Patient not found", HTTPStatus.NOT_FOUND);
        }
        if (patient.isProfileComplete()) {
            throw new AppError("Profile is already complete", HTTPStatus.BAD_REQUEST);
        }
        patient.completeProfile({
            gender: gender,
            dob: new Date(dob),
            phone,
        });
        await this._patientRepo.update(patient);
        return {
            isProfileComplete: patient.isProfileComplete(),
        };
    }
}
//# sourceMappingURL=CompletePatientProfileUseCase.js.map