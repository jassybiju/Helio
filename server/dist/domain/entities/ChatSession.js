import { CHAT_SESSION_STATUS } from "#domain/common/enums/chat.enum.js";
export class ChatSession {
    _id;
    _patientId;
    _doctorId;
    _status;
    _expiresAt;
    _updatedAt;
    _createdAt;
    constructor(_id, _patientId, _doctorId, _status, _expiresAt, _updatedAt, _createdAt) {
        this._id = _id;
        this._patientId = _patientId;
        this._doctorId = _doctorId;
        this._status = _status;
        this._expiresAt = _expiresAt;
        this._updatedAt = _updatedAt;
        this._createdAt = _createdAt;
    }
    updateExpiry(period) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + period);
        this._expiresAt = expiresAt;
        this._status = CHAT_SESSION_STATUS.ACTIVE;
        this._updatedAt = new Date();
    }
    isExpired() {
        const expired = new Date() >= this._expiresAt;
        if (expired && this._status !== CHAT_SESSION_STATUS.EXPIRED) {
            this._status = CHAT_SESSION_STATUS.EXPIRED;
            this._updatedAt = new Date();
        }
        return expired;
    }
    static create({ id, patientId, doctorId, period, }) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + period);
        return new ChatSession(id, patientId, doctorId, CHAT_SESSION_STATUS.ACTIVE, expiresAt, new Date(), new Date());
    }
    get id() {
        return this._id;
    }
    get patientId() {
        return this._patientId;
    }
    get doctorId() {
        return this._doctorId;
    }
    get status() {
        return this._status;
    }
    get expiresAt() {
        return this._expiresAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    get createdAt() {
        return this._createdAt;
    }
}
//# sourceMappingURL=ChatSession.js.map