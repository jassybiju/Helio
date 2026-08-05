import { Email } from "#domain/value-objects/Email.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class DoctorValidator {
    _doctorRepo;
    _passwordService;
    constructor(_doctorRepo, _passwordService) {
        this._doctorRepo = _doctorRepo;
        this._passwordService = _passwordService;
    }
    async ensureEmailAvailable(email) {
        const doctor = await this._doctorRepo.findByEmail(new Email(email));
        if (doctor && doctor.isVerified) {
            throw new AppError(MESSAGE.EMAIL_ALREADY_EXISTS, HTTPStatus.BAD_REQUEST);
        }
        return doctor;
    }
    async validateDoctorPassword(doctor, password) {
        if (!doctor.passwordHash) {
            throw new AppError("Invalid Email or Password", HTTPStatus.BAD_REQUEST);
        }
        if (!(await this._passwordService.compare(password, doctor.passwordHash))) {
            throw new AppError("Invalid Email or Password", HTTPStatus.BAD_REQUEST);
        }
    }
}
//# sourceMappingURL=DoctorValidator.js.map