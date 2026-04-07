import { AppError } from "@shared/errors/AppError.ts";
import type { BLOOD_GROUP } from "../common/enums/blood-group.enum.ts";
import type { GENDER } from "../common/enums/gender.enum.ts";
import type { Email } from "../value-objects/Email.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class Patient {
  constructor(
    private readonly _id: string,
    private readonly _email: Email,
    private _passwordHash: string | null,

    private readonly _firstName: string,
    private readonly _lastName: string | null,

    private _gender: GENDER | null,
    private _dob: Date | null,
    private _bloodGroup: BLOOD_GROUP | null,

    private _phone: string | null,

    private _isVerified: boolean,
    private _isBlocked: boolean,

    private _googleId: string | null,

    private readonly _createdAt: Date,
    private readonly _updatedAt: Date
  ) {
    if (this._phone && this._phone.length < 9) {
      throw new AppError(
        "Invalid Phone NUmber",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }
  }

  verifyPatient() {
    this._isVerified = true;
  }

  updatePassword(passwordHash: string) {
    this._passwordHash = passwordHash;
  }

  completeProfile({
    gender,
    dob,
    phone,
  }: {
    gender: GENDER;
    dob: Date;
    phone: string;
  }) {
    if (this._phone && this._phone.length < 9) {
      throw new AppError(
        "Invalid Phone NUmber",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }

    this._gender = gender;
    this._phone = phone;
    this._dob = dob;
  }

  toogleBlockStatus() {
    this._isBlocked = !this._isBlocked;
  }

  isProfileComplete(): boolean {
    return !!(this._firstName && this._gender && this._dob && this._phone);
  }

  linkGoogleId(googleId: string) {
    this._googleId = googleId;
  }

  get hasGoogleId() {
    return !!this._googleId;
  }

  get id() {
    return this._id;
  }

  get phone() {
    return this._phone;
  }

  get email() {
    return this._email.value;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get fullName() {
    return this._firstName + " " + this.lastName;
  }
  get gender() {
    return this._gender;
  }

  get bloodGroup() {
    return this._bloodGroup;
  }

  get dob() {
    return this._dob;
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

  get isVerified() {
    return this._isVerified;
  }

  get passwordHashed() {
    return this._passwordHash;
  }

  static googleCreate({
    id,
    firstName,
    googleId,
    createdAt,
    updatedAt,
    email,
  }: {
    id: string;
    firstName: string;
    googleId: string;
    createdAt: Date;
    updatedAt: Date;
    email: Email;
  }) {
    return new Patient(
      id,
      email,
      null,
      firstName,
      null,
      null,
      null,
      null,
      null,
      false,
      false,
      googleId,
      createdAt,
      updatedAt
    );
  }
}
