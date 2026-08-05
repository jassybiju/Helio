export class ChatMessage {
    _id;
    _chatSessionId;
    _senderId;
    _senderRole;
    _message;
    _createdAt;
    _readAt;
    constructor(_id, _chatSessionId, _senderId, _senderRole, _message, _createdAt, _readAt) {
        this._id = _id;
        this._chatSessionId = _chatSessionId;
        this._senderId = _senderId;
        this._senderRole = _senderRole;
        this._message = _message;
        this._createdAt = _createdAt;
        this._readAt = _readAt;
    }
    static create(id, chatSessionId, senderId, senderRole, message) {
        return new ChatMessage(id, chatSessionId, senderId, senderRole, message, new Date(), null);
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
//# sourceMappingURL=ChatMessage.js.map