export class Notification {
    _id;
    _userId;
    _role;
    _heading;
    _message;
    _isRead;
    _createdAt;
    constructor(_id, _userId, _role, _heading, _message, _isRead, _createdAt) {
        this._id = _id;
        this._userId = _userId;
        this._role = _role;
        this._heading = _heading;
        this._message = _message;
        this._isRead = _isRead;
        this._createdAt = _createdAt;
    }
    static create({ id, userId, role, heading, message, }) {
        return new Notification(id, userId, role, heading, message, false, new Date());
    }
    get id() {
        return this._id;
    }
    get userId() {
        return this._userId;
    }
    get role() {
        return this._role;
    }
    get heading() {
        return this._heading;
    }
    get message() {
        return this._message;
    }
    get isRead() {
        return this._isRead;
    }
    get createdAt() {
        return this._createdAt;
    }
}
//# sourceMappingURL=Notification.js.map