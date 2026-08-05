import { getIO } from "#config/socket.instance.js";
export class SocketRealTimeNotifier {
    constructor() { }
    async emitToRoom(room, event, payload) {
        getIO().to(room).emit(event, payload);
    }
}
//# sourceMappingURL=SocketRealTimeNotifier.js.map