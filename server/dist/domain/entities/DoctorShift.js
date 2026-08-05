import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class DoctorShift {
    _id;
    _doctorId;
    _dayOfWeek;
    _startTime;
    _endTime;
    _consultationType;
    _location;
    _slotIntervalInMinutes;
    _capacityPerSlot;
    _createdAt;
    _isDeleted;
    constructor(_id, _doctorId, _dayOfWeek, _startTime, _endTime, _consultationType, _location, _slotIntervalInMinutes, _capacityPerSlot, _createdAt, _isDeleted = false) {
        this._id = _id;
        this._doctorId = _doctorId;
        this._dayOfWeek = _dayOfWeek;
        this._startTime = _startTime;
        this._endTime = _endTime;
        this._consultationType = _consultationType;
        this._location = _location;
        this._slotIntervalInMinutes = _slotIntervalInMinutes;
        this._capacityPerSlot = _capacityPerSlot;
        this._createdAt = _createdAt;
        this._isDeleted = _isDeleted;
        if (!this._startTime.isBefore(this._endTime)) {
            throw new AppError("Invalid Start time and end Time", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
        if (this._slotIntervalInMinutes <= 0) {
            throw new AppError("Invalid slot interval", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
        if (this._capacityPerSlot <= 0) {
            throw new AppError("Invalid slot capacity", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
    }
    /**
     * Return true if there is no Overlapping
     * @param shifts Array of DoctorShifts
     * @returns boolean
     */
    isNotOverLapping(shifts) {
        for (let i of shifts) {
            if (i.dayOfWeek !== this.dayOfWeek) {
                continue;
            }
            if (this._startTime.isBefore(i.endTime) &&
                this._endTime.isAfter(i.startTime)) {
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
//# sourceMappingURL=DoctorShift.js.map