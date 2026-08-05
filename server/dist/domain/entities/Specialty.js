export class Specialty {
    _id;
    _name;
    _description;
    _isActive;
    constructor(_id, _name, _description, _isActive) {
        this._id = _id;
        this._name = _name;
        this._description = _description;
        this._isActive = _isActive;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get isActive() {
        return this._isActive;
    }
}
//# sourceMappingURL=Specialty.js.map