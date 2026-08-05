import { TRANSACTION_STATUS, type TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
export declare class WalletTransaction {
    private readonly _id;
    private readonly _walletId;
    private readonly _type;
    private readonly _amount;
    private _status;
    private readonly _referenceId;
    private readonly _description;
    private readonly _createdAt;
    constructor(_id: string, _walletId: string, _type: TRANSACTION_TYPE, _amount: number, _status: TRANSACTION_STATUS, _referenceId: string | null, _description: string | null, _createdAt: Date);
    paymentSuccessful(): void;
    static createTransaction({ id, walletId, type, amount, referenceId, description, }: {
        id: string;
        walletId: string;
        amount: number;
        type: TRANSACTION_TYPE;
        referenceId?: string | null;
        description?: string | null;
    }): WalletTransaction;
    get id(): string;
    get walletId(): string;
    get type(): TRANSACTION_TYPE;
    get amount(): number;
    get status(): TRANSACTION_STATUS;
    get referenceId(): string | null;
    get description(): string | null;
    get createdAt(): Date;
}
//# sourceMappingURL=WalletTransaction.d.ts.map