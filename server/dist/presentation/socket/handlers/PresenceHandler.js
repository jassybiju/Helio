// responsible to connection lifecyle
export class PresenceHandler {
    _presenceService;
    constructor(_presenceService) {
        this._presenceService = _presenceService;
    }
    register(socket) {
        const userId = socket.data.user.id;
        this._presenceService.setOnline(userId, socket.id);
        socket.on("presence:watch", (targetUserId) => {
            socket.join(this._room(targetUserId));
        });
        socket.on("disconnect", () => {
            this._presenceService.setOffline(userId, socket.id);
        });
    }
    _room(userId) {
        return `presence:${userId}`;
    }
}
//# sourceMappingURL=PresenceHandler.js.map