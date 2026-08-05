import { logger } from "#shared/utils/logger.utils.js";
// responsible for signaling for WEBRTC
export class SignalingHandler {
    _io;
    constructor(_io) {
        this._io = _io;
    }
    register(socket) {
        socket.on("webrtc:join-room", async ({ appointmentId }) => {
            const userId = socket.data.user.id;
            logger.debug("JOINED SIGNALING");
            const canJoin = await this._canJoinAppointment(appointmentId, userId);
            if (!canJoin) {
                return;
            }
            const sockets = await this._io
                .in(this._room(appointmentId))
                .fetchSockets();
            socket.join(this._room(appointmentId));
            // const otherSocket = sockets
            //   .filter((s) => s.id !== socket.id)
            //   .map((s) => s.id);
            // if (otherSocket.length > 0) {
            // socket.emit("webrtc:participant-exists", { socketId: socket.id });
            // }
            socket
                .to(this._room(appointmentId))
                .emit("webrtc:user-joined", socket.id);
            if (sockets.length > 0) {
                socket.emit("webrtc:existing-users", sockets.map((s) => s.id));
            }
        });
        socket.on("webrtc:signal", ({ signal, to }) => {
            this._io.to(to).emit("webrtc:signal", {
                signal,
                from: socket.id,
            });
        });
        socket.on("webrtc:leave-room", ({ appointmentId }) => {
            socket.leave(this._room(appointmentId));
            socket.to(this._room(appointmentId)).emit("webrtc:user-left");
        });
    }
    _room(appointmentId) {
        return `webrtc-room:${appointmentId}`;
    }
    async _canJoinAppointment(_appointmentId, _userId) {
        return true;
    }
}
//# sourceMappingURL=SignalingHandler.js.map