import type {
  CONSULTATION_TYPE,
  DAY_OF_WEEK,
} from "#domain/common/enums/doctorShift.enum.js";
import type { Time } from "#domain/value-objects/Time.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class DoctorShift {
  constructor(
    private readonly _id: string,
    private readonly _doctorId: string,
    private readonly _dayOfWeek: DAY_OF_WEEK,

    private readonly _startTime: Time,
    private readonly _endTime: Time,

    private readonly _consultationType: CONSULTATION_TYPE,
    private readonly _location: string | null,

    private readonly _slotIntervalInMinutes: number,
    private readonly _capacityPerSlot: number,
    private readonly _createdAt: Date,
    private readonly _isDeleted: boolean = false
  ) {
    if (!this._startTime.isBefore(this._endTime)) {
      throw new AppError(
        "Invalid Start time and end Time",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }

    if (this._slotIntervalInMinutes <= 0) {
      throw new AppError(
        "Invalid slot interval",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }

    if (this._capacityPerSlot <= 0) {
      throw new AppError(
        "Invalid slot capacity",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }
  }

  /**
   * Return true if there is no Overlapping
   * @param shifts Array of DoctorShifts
   * @returns boolean
   */
  isNotOverLapping(shifts: DoctorShift[]) {
    for (let i of shifts) {
      if (i.dayOfWeek !== this.dayOfWeek) {
        continue;
      }
      if (
        this._startTime.isBefore(i.endTime) &&
        this._endTime.isAfter(i.startTime)
      ) {
        return false;
      }
    }
    return true;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  get dayOfWeek() {
    return this._dayOfWeek;
  }

  get slotIntervalInMinutes() {
    return this._slotIntervalInMinutes;
  }

  get capacityPerSlot() {
    return this._capacityPerSlot;
  }

  get shiftId() {
    return this._id;
  }

  get doctorId() {
    return this._doctorId;
  }

  get consultationType() {
    return this._consultationType;
  }

  get location() {
    return this._location;
  }

  get createdAt() {
    return this._createdAt;
  }
  get isDeleted() {
    return this._isDeleted;
  }
}
