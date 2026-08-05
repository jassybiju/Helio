import { Email } from "#domain/value-objects/Email.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class PatientValidator {
    _patientRepo;
    _passwordService;
    constructor(_patientRepo, _passwordService) {
        this._patientRepo = _patientRepo;
        this._passwordService = _passwordService;
    }
    async ensureEmailAvailable(email) {
        const patient = await this._patientRepo.findByEmail(new Email(email));
        if (patient && patient.isVerified) {
            throw new AppError("Email Already Exists", HTTPStatus.BAD_REQUEST);
        }
        return patient;
    }
    /**
     * Checks if the password is valid for the patient
     * @param patient Patient Entity
     * @param password Password to validate with the hash
     */
    async validatePatientPassword(patient, password) {
        if (!(await this._passwordService.compare(password, patient.passwordHashed))) {
            throw new AppError("Invalid Email or Passwordss", HTTPStatus.BAD_REQUEST);
        }
    }
}
//# sourceMappingURL=PatientValidator.js.map