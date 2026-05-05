import {
  SLOT_STATUS,
  type CONSULTATION_TYPE,
} from "@domain/common/enums/doctorShift.enum.ts";
import type { Time } from "@domain/value-objects/Time.ts";

export class DoctorSlot {
  constructor(
    private readonly _shiftId: string,
    private readonly _doctorId: string,

    private readonly _startTime: Date,
    private readonly _endTime: Date,

    private readonly _consultationType: CONSULTATION_TYPE,
    private readonly _location?: string,
    private _units?: { status: SLOT_STATUS }[]
  ) {}

  overlaps(start: Date, end: Date): boolean {
    return this.startTime < end && this.endTime > start;
  }

  setUnits(units: { status: SLOT_STATUS }[]) {
    this._units = units;
  }
  get shiftId() {
    return this._shiftId;
  }

  get doctorId() {
    return this._doctorId;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  get consultationType() {
    return this._consultationType;
  }

  get location() {
    return this._location;
  }

  get slots() {
    return this._units;
  }
}
