import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export declare class Wallet {
    private readonly _id;
    private readonly _userId;
    private readonly _userRole;
    private _balance;
    private readonly _createdAt;
    private readonly _updatedAt;
    constructor(_id: string, _userId: string, _userRole: USER_ROLES, _balance: number, _createdAt: Date, _updatedAt: Date);
    credit(amount: number): void;
    debit(amount: number): void;
    static create({ id, userId, userRole, }: {
        id: string;
        userId: string;
        userRole: USER_ROLES;
    }): Wallet;
    get id(): string;
    get userId(): string;
    get userRole(): USER_ROLES;
    get balance(): number;
    get createdAt(): Date;
    get updatedAt(): Date;
}
//# sourceMappingURL=Wallet.d.ts.map