import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export class ChatMessage {
  constructor(
    private readonly _id: string,
    private readonly _chatSessionId: string,
    private readonly _senderId: string,
    private readonly _senderRole: USER_ROLES,
    private readonly _message: string,
    private readonly _createdAt: Date,
    private readonly _readAt: Date | null
  ) {}

  static create(
    id: string,
    chatSessionId: string,
    senderId: string,
    senderRole: USER_ROLES,
    message: string
  ) {
    return new ChatMessage(
      id,
      chatSessionId,
      senderId,
      senderRole,
      message,
      new Date(),
      null
    );
  }

  get id() {
    return this._id;
  }

  get chatSessionId() {
    return this._chatSessionId;
  }
  get senderRole() {
    return this._senderRole;
  }
  get senderId() {
    return this._senderId;
  }
  get message() {
    return this._message;
  }
  get createdAt() {
    return this._createdAt;
  }
  get readAt() {
    return this._readAt;
  }
}
