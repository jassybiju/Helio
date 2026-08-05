import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class DoctorBlockShift {
    _id;
    _doctorId;
    _startTime;
    _endTime;
    _reason;
    _createdAt;
    constructor(_id, _doctorId, _startTime, _endTime, _reason, _createdAt) {
        this._id = _id;
        this._doctorId = _doctorId;
        this._startTime = _startTime;
        this._endTime = _endTime;
        this._reason = _reason;
        this._createdAt = _createdAt;
        if (this._startTime > this._endTime) {
            throw new AppError("Invalid Time", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
    }
    /**
     * Returns true if there is no overlapping
     * @param blockShifts Array of BlockShifts
     * @returns boolean
     */
    isNotOverlapping(blockShifts) {
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
//# sourceMappingURL=DoctorBlockShift.js.map