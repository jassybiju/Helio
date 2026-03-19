import { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class Doctor {
  constructor(
    private readonly _id: string,
    private readonly _email: Email,
    private readonly __passwordHash: string,

    private readonly _fullName: string,
    private readonly _gender: GENDER,

    private readonly _specialization: string,
    private readonly _careerStartYear: number,
    private readonly _bio: string | null,

    private readonly _verificationStatus: DOCTOR_VERIFICATION_STATUS,
    private readonly _documentKey: string | null,
    private readonly _rejectionReason: string | null,

    private readonly _onlineFee: number | null,
    private readonly _clinicFee: number | null,

    private readonly _isVerified: boolean,
    private readonly _isBlocked: boolean,

    private readonly _createdAt: Date,
    private readonly _updatedAt: Date
  ) {
    if (
      this._careerStartYear <= 1900 ||
      this._careerStartYear > new Date().getFullYear()
    ) {
      throw new AppError(
        "Invalid Career Start Year",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }
  }

  get isVerified() {
    return this._isVerified;
  }

  static create({
    id,
    email,
    passwordHash,
    gender,
    full_name,
    specialization,
    career_start_year,
    documentKey,
    createdAt,
    updatedAt,
  }: {
    id: string;
    email: Email;
    passwordHash: string;
    gender: GENDER;
    full_name: string;
    specialization: string;
    career_start_year: number;
    documentKey: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new Doctor(
      id,
      email,
      passwordHash,
      full_name,
      gender,
      specialization,
      career_start_year,
      null,
      DOCTOR_VERIFICATION_STATUS.PENDING,
      documentKey,
      null,
      null,
      null,
      false,
      false,
      createdAt,
      updatedAt
    );
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get passwordHash() {
    return this.__passwordHash;
  }

  get fullName() {
    return this._fullName;
  }

  get gender() {
    return this._gender;
  }

  get specialization() {
    return this._specialization;
  }

  get careerStartYear() {
    return this._careerStartYear;
  }

  get bio() {
    return this._bio;
  }

  get verificationStatus() {
    return this._verificationStatus;
  }

  get documentKey() {
    return this._documentKey;
  }

  get rejectionReason() {
    return this._rejectionReason;
  }

  get onlineFee() {
    return this._onlineFee;
  }

  get clinicFee() {
    return this._clinicFee;
  }

  get isBlocked() {
    return this._isBlocked;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
