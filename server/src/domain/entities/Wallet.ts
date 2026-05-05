import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export class Wallet {
  constructor(
    private readonly _id : string,
    private readonly _userId : string,
    private readonly _userRole : USER_ROLES,

    private  _balance : number,
    private readonly _createdAt : Date,
    private readonly _updatedAt : Date
  ){}

  credit(amount : number){
    this._balance += amount
  }

  debit(amount : number){
    this._balance -= amount

  }
}