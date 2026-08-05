import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export declare class ChatMessage {
    private readonly _id;
    private readonly _chatSessionId;
    private readonly _senderId;
    private readonly _senderRole;
    private readonly _message;
    private readonly _createdAt;
    private readonly _readAt;
    constructor(_id: string, _chatSessionId: string, _senderId: string, _senderRole: USER_ROLES, _message: string, _createdAt: Date, _readAt: Date | null);
    static create(id: string, chatSessionId: string, senderId: string, senderRole: USER_ROLES, message: string): ChatMessage;
    get id(): string;
    get chatSessionId(): string;
    get senderRole(): USER_ROLES;
    get senderId(): string;
    get message(): string;
    get createdAt(): Date;
    get readAt(): Date | null;
}
//# sourceMappingURL=ChatMessage.d.ts.map