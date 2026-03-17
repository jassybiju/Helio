import type { OTP } from "@domain/entities/OTP.ts";
import type { OTPData } from "@shared/types/OTPData.ts";

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
    };
  }
}
