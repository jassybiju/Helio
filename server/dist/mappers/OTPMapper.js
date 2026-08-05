import { OTP } from "#domain/entities/OTP.js";
import { Email } from "#domain/value-objects/Email.js";
export class OTPMapper {
    static toPersistance(otp) {
        return {
            otp: otp.code,
            email: otp.email.value,
            resendCount: otp.resendCount,
            failedAttempts: otp.failedAttempts,
            purpose: otp.purpose,
            context: otp.context,
            invalidAt: otp.invalidAt,
            expiresAt: otp.expiresAt,
        };
    }
    static toDomain(raw, verificationId) {
        return new OTP(verificationId, new Email(raw.email), raw.otp, raw.purpose, raw.context, new Date(raw.invalidAt), new Date(raw.expiresAt), raw.resendCount, raw.failedAttempts);
    }
}
//# sourceMappingURL=OTPMapper.js.map