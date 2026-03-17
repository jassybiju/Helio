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

  get id() {
    return this._verficationId;
  }
  incrementAttempts() {
    this._failedAttempts++;
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
}
