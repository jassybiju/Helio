import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class ChangeDoctorPasswordUseCase {
    _logger;
    _doctorRepo;
    _passwordService;
    _doctorValidator;
    constructor(_logger, _doctorRepo, _passwordService, _doctorValidator) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._passwordService = _passwordService;
        this._doctorValidator = _doctorValidator;
    }
    async execute(userId, oldPassword, newPassword) {
        this._logger.info("Change Password Doctor attempt", {
            userId,
            oldPassword,
            newPassword,
        });
        const doctor = await this._doctorRepo.findById(userId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        await this._doctorValidator.validateDoctorPassword(doctor, oldPassword);
        doctor.updatePassword(await this._passwordService.hash(newPassword));
        this._doctorRepo.update(doctor);
    }
}
//# sourceMappingURL=DoctorChangePasswordUseCase.js.map