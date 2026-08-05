import { AppError } from "../../shared/errors/AppError.js";
import { HTTPStatus } from "../../shared/types/HTTPStatus.js";

export class Email {
  private _emailAddress;

  constructor(email: string) {
    if (!email) {
      throw new AppError("Email is Required", HTTPStatus.INTERNAL_ERROR);
    }

    if (!Email.isValid(email)) {
      throw new AppError("Email is Invalid", HTTPStatus.UNPROCESSBLE_ENTITY);
    }

    this._emailAddress = email;
  }

  get value() {
    return this._emailAddress;
  }

  public static isValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
