import { Email } from "#domain/value-objects/Email.js";
export class Admin {
    _id;
    _email;
    _passwordHash;
    constructor(_id, _email, _passwordHash) {
        this._id = _id;
        this._email = _email;
        this._passwordHash = _passwordHash;
    }
    static create(id, email, password) {
        return new Admin(id, new Email(email), password);
    }
    get passwordHash() {
        return this._passwordHash;
    }
    get id() {
        return this._id;
    }
    get email() {
        return this._email;
    }
}
//# sourceMappingURL=Admin.js.map