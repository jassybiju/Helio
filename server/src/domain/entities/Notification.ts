import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export class Notification {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _role: USER_ROLES,
    private readonly _heading: string,
    private readonly _message: string,
    private readonly _isRead: boolean,
    private readonly _createdAt: Date
  ) {}

  static create({
    id,
    userId,
    role,
    heading,
    message,
  }: {
    id: string;
    userId: string;
    role: USER_ROLES;
    heading: string;
    message: string;
  }) {
    return new Notification(
      id,
      userId,
      role,
      heading,
      message,
      false,
      new Date()
    );
  }

  get id() {
    return this._id;
  }
  get userId() {
    return this._userId;
  }
  get role() {
    return this._role;
  }
  get heading() {
    return this._heading;
  }
  get message() {
    return this._message;
  }
  get isRead() {
    return this._isRead;
  }
  get createdAt() {
    return this._createdAt;
  }
}
