import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class ResetPasswordUseCase {
    _logger;
    _resetTokenService;
    _patientRepo;
    _doctorRepo;
    _passwordService;
    constructor(_logger, _resetTokenService, _patientRepo, _doctorRepo, _passwordService) {
        this._logger = _logger;
        this._resetTokenService = _resetTokenService;
        this._patientRepo = _patientRepo;
        this._doctorRepo = _doctorRepo;
        this._passwordService = _passwordService;
    }
    async execute({ token, newPassword, }) {
        this._logger.info("Reset Password attemp", { token, newPassword });
        const data = await this._resetTokenService.verify(token);
        if (!data) {
            throw new AppError("Invalid or Expired Token", HTTPStatus.BAD_REQUEST);
        }
        const { userId, role } = data;
        let user;
        if (role === USER_ROLES.PATIENT) {
            user = await this._patientRepo.findById(userId);
        }
        if (role === USER_ROLES.DOCTOR) {
            user = await this._doctorRepo.findById(userId);
        }
        if (!user)
            throw new AppError("User not found", HTTPStatus.NOT_FOUND);
        user.updatePassword(await this._passwordService.hash(newPassword));
        if (role === USER_ROLES.PATIENT) {
            await this._patientRepo.update(user);
        }
        if (role === USER_ROLES.DOCTOR) {
            await this._doctorRepo.update(user);
        }
        await this._resetTokenService.invalidate(token);
    }
}
//# sourceMappingURL=ResetPasswordUseCase.js.map