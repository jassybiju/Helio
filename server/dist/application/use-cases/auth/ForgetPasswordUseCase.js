import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Email } from "#domain/value-objects/Email.js";
export class ForgetPasswordUseCase {
    _logger;
    _patientRepo;
    _doctorRepo;
    _resetTokenService;
    _messageQueue;
    constructor(_logger, _patientRepo, _doctorRepo, _resetTokenService, _messageQueue) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._doctorRepo = _doctorRepo;
        this._resetTokenService = _resetTokenService;
        this._messageQueue = _messageQueue;
    }
    async execute({ email, role, }) {
        this._logger.info("Forget Password Attempt", { email, role });
        let user;
        if (role == USER_ROLES.PATIENT) {
            user = await this._patientRepo.findByEmail(new Email(email));
        }
        if (role == USER_ROLES.DOCTOR) {
            user = await this._doctorRepo.findByEmail(new Email(email));
        }
        if (!user) {
            this._logger.info("Password reset requested for non-existing user", {
                email,
                role,
            });
            return;
        }
        if (!user.isVerified) {
            this._logger.info("Password reset requested for unverified user", {
                email,
                role,
            });
            return;
        }
        const ttlSeconds = Number(process.env.RESET_TOKEN_EXPIRY_SECS);
        const token = await this._resetTokenService.generate(user.id, role, ttlSeconds);
        await this._messageQueue.addJob(`FORGET_PASSWORD:${user.email}`, {
            to: user.email,
            subject: "Password Reset",
            body: `Click here to reset password : http://${role === USER_ROLES.PATIENT ? "" : "doctor."}helixo.com:3000/reset-password?token=${token}`,
        });
    }
}
//# sourceMappingURL=ForgetPasswordUseCase.js.map