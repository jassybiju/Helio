import type { OTP_PURPOSE } from "#domain/common/enums/otp.enum.js";
import type { Email } from "#domain/value-objects/Email.js";
export declare class OTP {
    private readonly _verficationId;
    private readonly _email;
    private readonly _otp;
    private readonly _purpose;
    private readonly _context;
    private readonly _validUntil;
    private readonly _expiration;
    private _resendCount;
    private _failedAttempts;
    constructor(_verficationId: string, _email: Email, _otp: string, _purpose: OTP_PURPOSE, _context: "patient" | "doctor", _validUntil: Date, _expiration: Date, _resendCount: number, _failedAttempts: number);
    incrementAttempts(): void;
    incrementResendAttempts(): void;
    hasExceededLimit(limit: number): boolean;
    hasExpired(): boolean;
    isOTPValid(inputOTP: string): boolean;
    verify(inputOTP: string, limit: number): void;
    static create({ id, email, otp, purpose, context, }: {
        id: string;
        email: Email;
        otp: string;
        purpose: OTP_PURPOSE;
        context: "patient" | "doctor";
    }): OTP;
    get id(): string;
    get invalidAt(): Date;
    get code(): string;
    get email(): Email;
    get resendCount(): number;
    get failedAttempts(): number;
    get purpose(): "REGISTER";
    get context(): "doctor" | "patient";
    get expiresAt(): Date;
}
//# sourceMappingURL=OTP.d.ts.map