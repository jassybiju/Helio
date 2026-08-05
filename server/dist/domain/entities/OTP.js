import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class OTP {
    _verficationId;
    _email;
    _otp;
    _purpose;
    _context;
    _validUntil;
    _expiration;
    _resendCount;
    _failedAttempts;
    constructor(_verficationId, _email, _otp, _purpose, _context, _validUntil, _expiration, _resendCount, _failedAttempts) {
        this._verficationId = _verficationId;
        this._email = _email;
        this._otp = _otp;
        this._purpose = _purpose;
        this._context = _context;
        this._validUntil = _validUntil;
        this._expiration = _expiration;
        this._resendCount = _resendCount;
        this._failedAttempts = _failedAttempts;
        if (this._otp.length < 6) {
            throw new AppError("Invalid OTP", HTTPStatus.BAD_REQUEST);
        }
    }
    incrementAttempts() {
        this._failedAttempts = this._failedAttempts + 1;
    }
    incrementResendAttempts() {
        this._resendCount = this._resendCount + 1;
    }
    hasExceededLimit(limit) {
        return limit <= this.failedAttempts;
    }
    hasExpired() {
        return new Date(this.invalidAt) < new Date();
    }
    isOTPValid(inputOTP) {
        return inputOTP === this._otp;
    }
    verify(inputOTP, limit) {
        // if otp is expired throw error
        if (this.hasExpired()) {
            throw new AppError("OTP was expired", HTTPStatus.BAD_REQUEST);
        }
        // if otp is incorrect throw error
        if (!this.isOTPValid(inputOTP)) {
            this.incrementAttempts();
            // if otp limit reached throw error
            if (this.hasExceededLimit(limit)) {
                throw new AppError("OTP limit has reached, resend otp", HTTPStatus.BAD_REQUEST);
            }
            throw new AppError("OTP is incorrect", HTTPStatus.BAD_REQUEST);
        }
    }
    static create({ id, email, otp, purpose, context, }) {
        const now = new Date().getTime();
        const VALID_UNTIL = new Date(now + Number(process.env.OTP_VALIDUNTIL_MINUTES || 2) * 60 * 1000);
        const EXPIRATION = new Date(now + Number(process.env.OTP_EXPIRATION_MINUTES || 5) * 60 * 1000);
        return new OTP(id, email, otp, purpose, context, VALID_UNTIL, EXPIRATION, 0, 0);
    }
    get id() {
        return this._verficationId;
    }
    get invalidAt() {
        return this._validUntil;
    }
    get code() {
        return this._otp;
    }
    get email() {
        return this._email;
    }
    get resendCount() {
        return this._resendCount;
    }
    get failedAttempts() {
        return this._failedAttempts;
    }
    get purpose() {
        return this._purpose;
    }
    get context() {
        return this._context;
    }
    get expiresAt() {
        return this._expiration;
    }
}
//# sourceMappingURL=OTP.js.map