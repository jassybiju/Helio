import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class DoctorBlockShift {
  constructor(
    private readonly _id: string,
    private readonly _doctorId: string,
    private readonly _startTime: Date,
    private readonly _endTime: Date,
    private readonly _reason: string | null,
    private readonly _createdAt: Date
  ) {
    if (this._startTime > this._endTime) {
      throw new AppError("Invalid Time", HTTPStatus.UNPROCESSBLE_ENTITY);
    }
  }

  /**
   * Returns true if there is no overlapping
   * @param blockShifts Array of BlockShifts
   * @returns boolean
   */
  isNotOverlapping(blockShifts: DoctorBlockShift[]) {
    for (let i of blockShifts) {
      if (this._startTime < i.endTime && this._endTime > i.startTime) {
        return false;
      }
    }
    return true;
  }

  get id() {
    return this._id;
  }
  get startTime() {
    return this._startTime;
  }
  get doctorId() {
    return this._doctorId;
  }
  get endTime() {
    return this._endTime;
  }
  get reason() {
    return this._reason;
  }
  get createdAt() {
    return this._createdAt;
  }
}
