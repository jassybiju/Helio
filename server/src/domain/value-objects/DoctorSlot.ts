import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";

export class DoctorSlot {
  constructor(
    private readonly _shiftId: string,
    private readonly _doctorId: string,
    private readonly _startTime: Date,
    private readonly _endTime: Date,
    private readonly _consultationType: CONSULTATION_TYPE,
    private _capacity: number = 0,
    private _bookedCount: number = 0,
    private readonly _location?: string | null
  ) {}

  overlaps(start: Date, end: Date): boolean {
    return this.startTime < end && this.endTime > start;
  }

  setCapacity(capacity: number) {
    this._capacity = capacity;
  }

  setBookedCount(count: number) {
    this._bookedCount = count;
  }

  incrementBookedCount() {
    this._bookedCount++;
  }

  get availableCount() {
    return this._capacity - this._bookedCount;
  }

  get isAvailable() {
    return this.availableCount > 0;
  }

  get capacity() {
    return this._capacity;
  }

  get bookedCount() {
    return this._bookedCount;
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
}
