import type { IUpdateDoctorInput } from "@application/ports/use-cases/doctor/profile/IUpdateDoctorProfileUseCase.ts";
import { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class Doctor {
  constructor(
    private readonly _id: string,
    private readonly _email: Email,
    private _passwordHash: string | null,

    private _fullName: string,
    private _gender: GENDER | null,

    private _specialization: string | null,
    private _careerStartYear: number | null,
    private _bio: string | null,

    private _verificationStatus: DOCTOR_VERIFICATION_STATUS,
    private _documentKey: string | null,
    private _rejectionReason: string | null,
    private _additionalInfo: string | null,

    private _onlineFee: number | null,
    private _clinicFee: number | null,

    private _googleId: string | null,

    private _isVerified: boolean,
    private _isBlocked: boolean,

    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
    private _verificationHistory: {
      status: DOCTOR_VERIFICATION_STATUS;
      reason: string | null;
      documentKey: string | null;
      actedAt: Date;
    }[] = [],
    private readonly _isDeleted : boolean = false

  ) {
    if (
      this._careerStartYear &&
      (this._careerStartYear <= 1900 ||
        this._careerStartYear > new Date().getFullYear())
    ) {
      throw new AppError(
        "Invalid Career Start Year",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }
  }

  private static readonly _validTransistions: Record<
    DOCTOR_VERIFICATION_STATUS,
    DOCTOR_VERIFICATION_STATUS[]
  > = {
    [DOCTOR_VERIFICATION_STATUS.PENDING]: [
      DOCTOR_VERIFICATION_STATUS.APPROVED,
      DOCTOR_VERIFICATION_STATUS.REJECTED,
    ],
    [DOCTOR_VERIFICATION_STATUS.REJECTED]: [DOCTOR_VERIFICATION_STATUS.PENDING],
    [DOCTOR_VERIFICATION_STATUS.APPROVED]: [],
  };

  static isValidTransistion(
    current: DOCTOR_VERIFICATION_STATUS,
    next: DOCTOR_VERIFICATION_STATUS
  ) {
    return this._validTransistions[current].includes(next);
  }

  resubmit(documentKey: string, additionalInfo: string) {
    this._verificationStatus = DOCTOR_VERIFICATION_STATUS.PENDING;
    this._rejectionReason = null;
    this._documentKey = documentKey;
    this._additionalInfo = additionalInfo;
    this._verificationHistory.push({
      status: DOCTOR_VERIFICATION_STATUS.PENDING,
      reason: null,
      documentKey: documentKey,
      actedAt: new Date(),
    });
  }

  approve() {
    this._verificationStatus = DOCTOR_VERIFICATION_STATUS.APPROVED;
    this._rejectionReason = null;
    this._verificationHistory.push({
      status: DOCTOR_VERIFICATION_STATUS.APPROVED,
      reason: null,
      documentKey: null,
      actedAt: new Date(),
    });
  }

  reject(reason: string) {
    this._verificationStatus = DOCTOR_VERIFICATION_STATUS.REJECTED;
    this._rejectionReason = reason;
    this._verificationHistory.push({
      status: DOCTOR_VERIFICATION_STATUS.REJECTED,
      reason,
      documentKey: null,
      actedAt: new Date(),
    });
  }
  updateFee({
    clinicFee,
    onlineFee,
  }: {
    clinicFee?: number;
    onlineFee?: number;
  }) {
    if (clinicFee) {
      this._clinicFee = clinicFee;
    }
    if (onlineFee) {
      this._onlineFee = onlineFee;
    }
  }

  updateProfile(data: Omit<IUpdateDoctorInput, "doctorId">) {
    this._fullName = data.fullName;
    this._specialization = data.specialization;
    this._bio = data.bio;
  }

  canAccessPlatform() {
    return (
      this._isVerified &&
      !this._isBlocked &&
      this._verificationStatus === DOCTOR_VERIFICATION_STATUS.APPROVED
    );
  }

  isProfileComplete(): boolean {
    console.log(
      this._fullName,
      this._gender,
      this._specialization,
      this._careerStartYear,
      this._documentKey,
      this._isVerified,
      "abc"
    );
    return !!(
      this._fullName &&
      this._gender &&
      this._specialization &&
      this._careerStartYear &&
      this._documentKey &&
      this._isVerified
    );
  }

  toogleBlockStatus() {
    this._isBlocked = !this._isBlocked;
  }

  linkGoogleId(googleId: string) {
    this._googleId = googleId;
  }

  verifyDoctor() {
    this._isVerified = true;
  }

  updatePassword(passwordHash: string) {
    this._passwordHash = passwordHash;
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
    console.log(passwordHash);
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
      null,
      null,
      false,
      false,
      createdAt,
      updatedAt,
      [
        {
          status: DOCTOR_VERIFICATION_STATUS.PENDING,
          reason: "",
          documentKey: documentKey,
          actedAt: new Date(),
        },
      ]
    );
  }

  static googleCreate({
    id,
    email,
    fullName,
    googleId,
    createdAt,
    updatedAt,
  }: {
    id: string;
    email: Email;
    fullName: string;
    googleId: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new Doctor(
      id,
      email,
      null,
      fullName,
      null,
      null,
      null,
      null,
      DOCTOR_VERIFICATION_STATUS.PENDING,
      null,
      null,
      null,
      null,
      null,
      googleId,
      true,
      false,
      createdAt,
      updatedAt
    );
  }

  completeProfile({
    gender,
    specialization,
    careerStartYear,
    documentKey,
  }: {
    gender: GENDER;
    specialization: string;
    careerStartYear: number;
    documentKey: string;
  }) {
    if (
      this._careerStartYear &&
      (this._careerStartYear <= 1900 ||
        this._careerStartYear > new Date().getFullYear())
    ) {
      throw new AppError(
        "Invalid Career Start Year",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }
    this._gender = gender;
    this._specialization = specialization;
    this._careerStartYear = careerStartYear;
    this._documentKey = documentKey;
    this._verificationHistory = [
      {
        status: DOCTOR_VERIFICATION_STATUS.PENDING,
        reason: "",
        documentKey: documentKey,
        actedAt: new Date(),
      },
    ];
  }

  get yearsOfExperience() {
    if (this._careerStartYear) {
      return new Date().getFullYear() - this._careerStartYear;
    }
  }

  get verificationHistory() {
    return this._verificationHistory;
  }

  get hasGoogleId() {
    return !!this._googleId;
  }

  get isVerified() {
    return this._isVerified;
  }
  get id() {
    return this._id;
  }

  get email() {
    return this._email.value;
  }

  get passwordHash() {
    return this._passwordHash;
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

  get additionalInfo() {
    return this._additionalInfo;
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
