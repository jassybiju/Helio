import { TRANSACTION_STATUS, } from "#domain/common/enums/wallet.enum.js";
export class WalletTransaction {
    _id;
    _walletId;
    _type;
    _amount;
    _status;
    _referenceId;
    _description;
    _createdAt;
    constructor(_id, _walletId, _type, _amount, _status, _referenceId, _description, _createdAt) {
        this._id = _id;
        this._walletId = _walletId;
        this._type = _type;
        this._amount = _amount;
        this._status = _status;
        this._referenceId = _referenceId;
        this._description = _description;
        this._createdAt = _createdAt;
    }
    paymentSuccessful() {
        this._status = TRANSACTION_STATUS.COMPLETED;
    }
    static createTransaction({ id, walletId, type, amount, referenceId, description, }) {
        return new WalletTransaction(id, walletId, type, amount, TRANSACTION_STATUS.PENDING, referenceId ?? null, description ?? null, new Date());
    }
    get id() {
        return this._id;
    }
    get walletId() {
        return this._walletId;
    }
    get type() {
        return this._type;
    }
    get amount() {
        return this._amount;
    }
    get status() {
        return this._status;
    }
    get referenceId() {
        return this._referenceId;
    }
    get description() {
        return this._description;
    }
    get createdAt() {
        return this._createdAt;
    }
}
//# sourceMappingURL=WalletTransaction.js.map