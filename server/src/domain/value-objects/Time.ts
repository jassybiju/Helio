import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class Time {
  private readonly _hours: number;
  private readonly _mins: number;

  constructor(private readonly value: string) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!regex.test(value)) {
      throw new AppError("Invalid Time format", HTTPStatus.INTERNAL_ERROR);
    }

    const [hours, minutes] = value.split(":").map((x) => Number(x));

    this._hours = hours!;
    this._mins = minutes!;
  }

  toMinutes(): number {
    return this._hours * 60 + this._mins;
  }

  /**
   * Return true if this time is before other
   * @param other Time Object
   * @returns Boolean
   */
  isBefore(other: Time) {
    return this.toMinutes() < other.toMinutes();
  }

  /**
   * Return true if this time is after other
   * @param other Time Object
   * @returns Boolean
   */
  isAfter(other: Time) {
    return this.toMinutes() > other.toMinutes();
  }

  addMinutes(mins: number) {
    const total = this.toMinutes() + mins;
    const hours = Math.floor(total / 60) % 24;
    const minutes = total % 60;

    return new Time(
      `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    );
  }

  get hours() {
    return this._hours;
  }

  get minutes() {
    return this._mins;
  }

  /**
   *
   * @returns String representation to the time eg : HH:MM
   */
  toString() {
    return `${this._hours.toString().padStart(2, "0")}:${this._mins.toString().padStart(2, "0")}`;
  }

  clone() {
    return new Time(this.toString());
  }

  toDate(date: Date) {
    return new Date(new Date(date).setHours(this._hours, this.minutes, 0, 0));
  }
}
