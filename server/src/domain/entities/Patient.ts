import type { BLOOD_GROUP } from "../common/enums/blood-group.enum.ts";
import type { GENDER } from "../common/enums/gender.enum.ts";
import type { Email } from "../value-objects/Email.ts";

export class Patient {
  constructor(
    private readonly _id: string,
    private readonly _email: Email,
    private readonly _passwordHash: string,

    private readonly _firstName: string,
    private readonly _lastName: string,

    private readonly _gender: GENDER,
    private readonly _dob: Date,
    private readonly _bloodGroup: BLOOD_GROUP | null,

    private _isVerified: boolean,
    private readonly _isBlocked: boolean,

    private readonly _createdAt: Date,
    private readonly _updatedAt: Date
  ) {}

  verifyPatient() {
    this._isVerified = true;
  }

  get id() {
    return this._id;
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
    return this._firstName + this.lastName;
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
}
