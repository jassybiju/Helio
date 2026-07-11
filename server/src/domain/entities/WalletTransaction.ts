import {
  TRANSACTION_STATUS,
  type TRANSACTION_TYPE,
} from "@domain/common/enums/wallet.enum.ts";

export class WalletTransaction {
  constructor(
    private readonly _id: string,
    private readonly _walletId: string,
    private readonly _type: TRANSACTION_TYPE,

    private readonly _amount: number,
    private _status: TRANSACTION_STATUS,

    private readonly _referenceId: string | null,
    private readonly _description: string | null,

    private readonly _createdAt: Date
  ) {}

  paymentSuccessful() {
    this._status = TRANSACTION_STATUS.COMPLETED;
  }

  static createTransaction({
    id,
    walletId,
    type,
    amount,
    referenceId,
    description,
  }: {
    id: string;
    walletId: string;
    amount: number;
    type: TRANSACTION_TYPE;
    referenceId?: string | null;
    description?: string | null;
  }) {
    return new WalletTransaction(
      id,
      walletId,
      type,
      amount,
      TRANSACTION_STATUS.PENDING,
      referenceId ?? null,
      description ?? null,
      new Date()
    );
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
