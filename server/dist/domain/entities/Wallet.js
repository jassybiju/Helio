export class Wallet {
    _id;
    _userId;
    _userRole;
    _balance;
    _createdAt;
    _updatedAt;
    constructor(_id, _userId, _userRole, _balance, _createdAt, _updatedAt) {
        this._id = _id;
        this._userId = _userId;
        this._userRole = _userRole;
        this._balance = _balance;
        this._createdAt = _createdAt;
        this._updatedAt = _updatedAt;
    }
    credit(amount) {
        this._balance += amount;
    }
    debit(amount) {
        this._balance -= amount;
    }
    static create({ id, userId, userRole, }) {
        return new Wallet(id, userId, userRole, 0, new Date(), new Date());
    }
    get id() {
        return this._id;
    }
    get userId() {
        return this._userId;
    }
    get userRole() {
        return this._userRole;
    }
    get balance() {
        return this._balance;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
}
//# sourceMappingURL=Wallet.js.map