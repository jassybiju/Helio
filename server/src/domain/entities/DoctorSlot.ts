import type {
  CONSULTATION_TYPE,
  SLOT_STATUS,
} from "@domain/common/enums/doctorShift.enum.ts";
import type { Time } from "@domain/value-objects/Time.ts";

export class DoctorSlot {
  constructor(
    private readonly _id: string,
    private readonly _shiftId: string,
    private readonly _doctorId: string,
    private readonly _appointmentId: string | null,

    private readonly _startTime: Date,
    private readonly _endTime: Date,

    private readonly _consultationType: CONSULTATION_TYPE,
    private readonly _status: SLOT_STATUS,

    private readonly _createdAt: Date,
    private readonly _isDeleted: boolean = false
  ) {}

  get slotId() {
    return this._id;
  }

  get shiftId() {
    return this._shiftId;
  }

  get doctorId() {
    return this._doctorId;
  }

  get appointmentId() {
    return this._appointmentId;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  get createdAt() {
    return this._createdAt;
  }

  get consultationType() {
    return this._consultationType;
  }

  get status() {
    return this._status;
  }

  get isDeleted() {
    return this._isDeleted;
  }
}
