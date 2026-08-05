import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export declare class Notification {
    private readonly _id;
    private readonly _userId;
    private readonly _role;
    private readonly _heading;
    private readonly _message;
    private readonly _isRead;
    private readonly _createdAt;
    constructor(_id: string, _userId: string, _role: USER_ROLES, _heading: string, _message: string, _isRead: boolean, _createdAt: Date);
    static create({ id, userId, role, heading, message, }: {
        id: string;
        userId: string;
        role: USER_ROLES;
        heading: string;
        message: string;
    }): Notification;
    get id(): string;
    get userId(): string;
    get role(): USER_ROLES;
    get heading(): string;
    get message(): string;
    get isRead(): boolean;
    get createdAt(): Date;
}
//# sourceMappingURL=Notification.d.ts.map