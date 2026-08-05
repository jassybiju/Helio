import { Email } from "#domain/value-objects/Email.js";

export class Admin {
  constructor(
    private readonly _id: string,
    private readonly _email: Email,
    private readonly _passwordHash: string
  ) {}

  static create(id: string, email: string, password: string) {
    return new Admin(id, new Email(email), password);
  }

  get passwordHash() {
    return this._passwordHash;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }
}
