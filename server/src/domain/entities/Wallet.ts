import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export class Wallet {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _userRole: USER_ROLES,

    private _balance: number,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date
  ) {}

  credit(amount: number) {
    this._balance += amount;
  }

  debit(amount: number) {
    this._balance -= amount;
  }

  static create({
    id,
    userId,
    userRole,
  }: {
    id: string;
    userId: string;
    userRole: USER_ROLES;
  }) {
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
