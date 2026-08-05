import type { OTP_PURPOSE } from "#domain/common/enums/otp.enum.js";
export type OTPData = {
    email: string;
    otp: string;
    invalidAt: Date;
    expiresAt: Date;
    purpose: OTP_PURPOSE;
    failedAttempts: number;
    resendCount: number;
    context: string;
};
//# sourceMappingURL=OTPData.d.ts.map