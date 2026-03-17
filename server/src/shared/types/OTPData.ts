import type { OTP_PURPOSE } from "@domain/common/enums/otp.enum.ts";

export type OTPData = {
  email: string;
  otp: string;
  invalidAt: Date;
  purpose: OTP_PURPOSE;
  failedAttempts: number;
  resendCount: number;
  context: string;
};
