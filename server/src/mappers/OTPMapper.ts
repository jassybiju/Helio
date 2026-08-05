import { OTP } from "#domain/entities/OTP.js";
import { Email } from "#domain/value-objects/Email.js";
import type { OTPData } from "#shared/types/OTPData.js";

export class OTPMapper {
  static toPersistance(otp: OTP): OTPData {
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

  static toDomain(raw: OTPData, verificationId: string): OTP {
    return new OTP(
      verificationId,
      new Email(raw.email),
      raw.otp,
      raw.purpose,
      raw.context as "patient" | "doctor",
      new Date(raw.invalidAt),
      new Date(raw.expiresAt),
      raw.resendCount,
      raw.failedAttempts
    );
  }
}
