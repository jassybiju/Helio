export class UserPresenceService {
    _onlineUsers = new Map();
    setOnline(userId, socketId) {
        const sockets = this._onlineUsers.get(userId) ?? new Set();
        sockets.add(socketId);
        this._onlineUsers.set(userId, sockets);
    }
    setOffline(userId, socketId) {
        let sockets = this._onlineUsers.get(userId);
        if (!sockets)
            return;
        sockets.delete(socketId);
        if (sockets.size === 0) {
            this._onlineUsers.delete(userId);
        }
    }
    isOnline(userId) {
        return this._onlineUsers.has(userId);
    }
    getSocketIds(userId) {
        return [...(this._onlineUsers.get(userId) ?? [])];
    }
}
//# sourceMappingURL=UserPresenceService.js.map