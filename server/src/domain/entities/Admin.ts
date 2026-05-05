import type { Email } from "@domain/value-objects/Email.ts";

export class Admin {
  constructor(
    private readonly _id: string,
    private readonly _email: Email,
    private readonly _passwordHash: string
  ) {}

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
