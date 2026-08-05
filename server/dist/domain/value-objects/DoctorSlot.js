export class DoctorSlot {
    _shiftId;
    _doctorId;
    _startTime;
    _endTime;
    _consultationType;
    _capacity;
    _bookedCount;
    _location;
    constructor(_shiftId, _doctorId, _startTime, _endTime, _consultationType, _capacity = 0, _bookedCount = 0, _location) {
        this._shiftId = _shiftId;
        this._doctorId = _doctorId;
        this._startTime = _startTime;
        this._endTime = _endTime;
        this._consultationType = _consultationType;
        this._capacity = _capacity;
        this._bookedCount = _bookedCount;
        this._location = _location;
    }
    overlaps(start, end) {
        return this.startTime < end && this.endTime > start;
    }
    setCapacity(capacity) {
        this._capacity = capacity;
    }
    setBookedCount(count) {
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
//# sourceMappingURL=DoctorSlot.js.map