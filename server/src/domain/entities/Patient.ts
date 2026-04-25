import { AppError } from "@shared/errors/AppError.ts";
import type { BLOOD_GROUP } from "../common/enums/blood-group.enum.ts";
import type { GENDER } from "../common/enums/gender.enum.ts";
import type { Email } from "../value-objects/Email.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { ALLERGEN_SEVERITY } from "@domain/common/enums/allergen_severity.ts";
import type { IUpdatePatientInput } from "@application/ports/use-cases/patient/profile/IUpdatePatientProfileUseCase.ts";

export class Patient {
  constructor(
    private readonly _id: string,
    private _email: Email,
    private _passwordHash: string | null,

    private _firstName: string,
    private _lastName: string | null,

    private _gender: GENDER | null,
    private _dob: Date | null,
    private _bloodGroup: BLOOD_GROUP | null,

    private _phone: string | null,

    private _isVerified: boolean,
    private _isBlocked: boolean,

    private _allergens: Array<{
      _id: string;
      name: string;
      severity: ALLERGEN_SEVERITY;
      createdAt: Date;
    }>,
    private _conditions: Array<{ _id: string; name: string; createdAt: Date }>,

    private _googleId: string | null,

    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
    private readonly _isDeleted: boolean = false
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

  addAllergen({
    allergen,
    _id,
    severity,
  }: {
    allergen: string;
    _id: string;
    severity: ALLERGEN_SEVERITY;
  }) {
    if (this._allergens.some((a) => a.name === allergen)) {
      throw new AppError(
        "Allergen Already exists",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }
    this._allergens.push({
      name: allergen,
      _id,
      severity,
      createdAt: new Date(),
    });
  }

  updateProfile(data: Omit<IUpdatePatientInput, "patientId">) {
    if (data.phone.length < 9) {
      throw new AppError(
        "Invalid Phone Number",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }

    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._gender = data.gender as GENDER;
    this._dob = new Date(data.dob);
    this._bloodGroup = data.bloodGroup as BLOOD_GROUP;
    this._phone = data.phone;
  }

  removeAllergen(allergenId: string) {
    this._allergens = this._allergens.filter((a) => a._id !== allergenId);
  }

  addCondition({ _id, condition }: { _id: string; condition: string }) {
    if (this._conditions.some((a) => a.name === condition)) {
      throw new AppError(
        "Condition Already exists",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }
    this._conditions.push({ _id, name: condition, createdAt: new Date() });
  }

  removeCondition(conditionId: string) {
    this._conditions = this._conditions.filter((c) => c._id !== conditionId);
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

  get googleId() {
    return this._googleId;
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

  get isDeleted() {
    return this._isDeleted;
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

  get allergens() {
    return this._allergens;
  }

  get conditions() {
    return this._conditions;
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
      [],
      [],
      googleId,
      createdAt,
      updatedAt
    );
  }
}
