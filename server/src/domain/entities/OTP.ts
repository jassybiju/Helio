import type { OTP_PURPOSE } from "@domain/common/enums/otp.enum.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class OTP {
  constructor(
    private readonly _verficationId: string,
    private readonly _email: Email,
    private readonly _otp: string,
    private readonly _purpose: OTP_PURPOSE,
    private readonly _context: "patient" | "doctor",
    private readonly _validUntil: Date,
    private readonly _expiration: Date,
    private _resendCount: number,
    private _failedAttempts: number
  ) {
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

  hasExceededLimit(limit: number) {
    return limit <= this.failedAttempts;
  }

  hasExpired() {
    return new Date(this.invalidAt) < new Date();
  }

  isOTPValid(inputOTP: string) {
    return inputOTP === this._otp;
  }

  verify(inputOTP: string, limit: number) {
    // if otp is expired throw error
    if (this.hasExpired()) {
      throw new AppError("OTP was expired", HTTPStatus.BAD_REQUEST);
    }

    // if otp is incorrect throw error
    if (!this.isOTPValid(inputOTP)) {
      this.incrementAttempts();
      // if otp limit reached throw error
      if (this.hasExceededLimit(limit)) {
        throw new AppError(
          "OTP limit has reached, resend otp",
          HTTPStatus.BAD_REQUEST
        );
      }
      throw new AppError("OTP is incorrect", HTTPStatus.BAD_REQUEST);
    }
  }

  static create({
    id,
    email,
    otp,
    purpose,
    context,
  }: {
    id: string;
    email: Email;
    otp: string;
    purpose: OTP_PURPOSE;
    context: "patient" | "doctor";
  }) {
    const now = new Date().getTime();
    const VALID_UNTIL = new Date(
      now + Number(process.env.OTP_VALIDUNTIL_MINUTES || 2) * 60 * 1000
    );
    const EXPIRATION = new Date(
      now + Number(process.env.OTP_EXPIRATION_MINUTES || 5) * 60 * 1000
    );
    return new OTP(
      id,
      email,
      otp,
      purpose,
      context,
      VALID_UNTIL,
      EXPIRATION,
      0,
      0
    );
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
