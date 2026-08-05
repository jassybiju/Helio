import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Wallet } from "#domain/entities/Wallet.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class VerifyOTPUseCase {
    _logger;
    _otpRepo;
    _patientRepo;
    _doctorRepo;
    _walletRepo;
    _idGenerator;
    constructor(_logger, _otpRepo, _patientRepo, _doctorRepo, _walletRepo, _idGenerator) {
        this._logger = _logger;
        this._otpRepo = _otpRepo;
        this._patientRepo = _patientRepo;
        this._doctorRepo = _doctorRepo;
        this._walletRepo = _walletRepo;
        this._idGenerator = _idGenerator;
    }
    async execute(input) {
        const { id, otp, context } = input;
        this._logger.info("Verifying otp :  ", input);
        //getting otp data from using id
        const otpData = await this._otpRepo.findByIdAndContext(id, context);
        this._logger.info("Saved : OTP : ", otpData);
        // if no otp found throw error
        if (!otpData) {
            throw new AppError("OTP not found", HTTPStatus.NOT_FOUND);
        }
        //verifying otp
        let OTP_LIMIT = Number(process.env.OTP_LIMIT || 5);
        try {
            otpData.verify(otp, OTP_LIMIT);
        }
        catch (error) {
            this._logger.debug("OTP LIMIT UPDATED", otpData.hasExceededLimit(OTP_LIMIT));
            if (!otpData.hasExceededLimit(OTP_LIMIT)) {
                await this._otpRepo.save(otpData);
            }
            throw error;
        }
        // otp is correct
        let user;
        let wallet = null;
        const WALLET_PREFIX = process.env.WALLET_PREFIX;
        const walletId = this._idGenerator.generate(WALLET_PREFIX);
        if (context === "patient") {
            user = await this._patientRepo.findByEmail(otpData.email);
            if (!user) {
                throw new AppError("User not found", HTTPStatus.NOT_FOUND);
            }
            if (user.isVerified) {
                throw new AppError("User Already Verified", HTTPStatus.BAD_REQUEST);
            }
            user.verifyPatient();
            await this._patientRepo.update(user);
            // creating wallet for patient
            wallet = Wallet.create({
                id: walletId,
                userId: user.id,
                userRole: USER_ROLES.PATIENT,
            });
        }
        else if (context === "doctor") {
            user = await this._doctorRepo.findByEmail(otpData.email);
            if (!user) {
                throw new AppError("User not found", HTTPStatus.NOT_FOUND);
            }
            if (user.isVerified) {
                throw new AppError("User Already Verified", HTTPStatus.BAD_REQUEST);
            }
            user.verifyDoctor();
            await this._doctorRepo.update(user);
            // creating wallet for doctor
            wallet = Wallet.create({
                id: walletId,
                userId: user.id,
                userRole: USER_ROLES.DOCTOR,
            });
        }
        await this._otpRepo.delete(id);
        if (wallet) {
            await this._walletRepo.create(wallet);
        }
        return { is_verified: true };
    }
}
//# sourceMappingURL=VerifyOTPUseCase.js.map