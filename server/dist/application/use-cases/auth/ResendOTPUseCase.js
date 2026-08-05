import { OTP } from "#domain/entities/OTP.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class ResendOTPUseCase {
    _logger;
    _otpRepo;
    _otpService;
    _messageQueue;
    constructor(_logger, _otpRepo, _otpService, _messageQueue) {
        this._logger = _logger;
        this._otpRepo = _otpRepo;
        this._otpService = _otpService;
        this._messageQueue = _messageQueue;
    }
    async execute(input) {
        const { id } = input;
        this._logger.info("Resending otp of id ", id);
        // getting previous otp
        const otpData = await this._otpRepo.findById(id);
        // if no otp throw error
        if (!otpData) {
            throw new AppError("OTP Instance expired", HTTPStatus.BAD_REQUEST);
        }
        // if otp is still valid throw error
        if (!otpData.hasExpired()) {
            throw new AppError("OTP is still valid, wait", HTTPStatus.BAD_REQUEST);
        }
        // if otp resend count reached
        const OTP_RESEND_LIMIT = Number(process.env.OTP_RESEND_LIMIT || 3);
        if (otpData.resendCount >= OTP_RESEND_LIMIT) {
            throw new AppError("OTP resend limit reached try again", HTTPStatus.BAD_REQUEST);
        }
        this._otpRepo.delete(id);
        // creating new otp
        const otp = this._otpService.generate();
        const newOTP = OTP.create({
            id,
            otp,
            email: otpData.email,
            purpose: otpData.purpose,
            context: otpData.context,
        });
        newOTP.incrementResendAttempts();
        // saving otp
        await this._otpRepo.save(newOTP);
        // sending otp
        await this._messageQueue.addJob(`RESEND:${otpData.email}`, {
            to: otpData.email.value,
            subject: "Your OTP For the helixo",
            body: `Your OTP is ${newOTP.code}`,
        });
        //response
        return {
            otp_sent: true,
            invalidAt: String(newOTP.invalidAt.getTime()),
            id: newOTP.id,
        };
    }
}
//# sourceMappingURL=ResendOTPUseCase.js.map