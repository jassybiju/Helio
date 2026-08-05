export class Review {
    _id;
    _doctorId;
    _patientId;
    _rating;
    _comments;
    _createdAt;
    _updatedAt;
    constructor(_id, _doctorId, _patientId, _rating, _comments, _createdAt, _updatedAt) {
        this._id = _id;
        this._doctorId = _doctorId;
        this._patientId = _patientId;
        this._rating = _rating;
        this._comments = _comments;
        this._createdAt = _createdAt;
        this._updatedAt = _updatedAt;
    }
    static create({ id, doctorId, patientId, rating, comments, }) {
        return new Review(id, doctorId, patientId, rating, comments, new Date(), new Date());
    }
    get id() {
        return this._id;
    }
    get doctorId() {
        return this._doctorId;
    }
    get patientId() {
        return this._patientId;
    }
    get rating() {
        return this._rating;
    }
    get comments() {
        return this._comments;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
}
//# sourceMappingURL=Review.js.map