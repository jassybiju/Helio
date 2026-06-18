import { logger } from "@shared/utils/logger.utils.ts";
import type { Server } from "socket.io";
import type { Socket } from "socket.io";

// responsible for signaling for WEBRTC
export class SignalingHandler {
  constructor(private readonly _io: Server) {}
  register(socket: Socket) {
    socket.on("webrtc:join-room", async ({ appointmentId }) => {
      const userId = socket.data.user.id;
      logger.debug("JOINED");
      const canJoin = await this._canJoinAppointment(appointmentId, userId);
      if (!canJoin) {
        return;
      }

      const sockets = await this._io
        .in(this._room(appointmentId))
        .fetchSockets();
      socket.join(this._room(appointmentId));

      const otherSocket = sockets
        .filter((s) => s.id !== socket.id)
        .map((s) => s.id);

      // if (otherSocket.length > 0) {
      // socket.emit("webrtc:participant-exists", { socketId: socket.id });
      // }
      socket
        .to(this._room(appointmentId))
        .emit("webrtc:user-joined", socket.id);

      if (sockets.length > 0) {
        socket.emit(
          "webrtc:existing-users",
          sockets.map((s) => s.id)
        );
      }
    });

    socket.on("webrtc:signal", ({ appointmentId, signal, to }) => {
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

  private _room(appointmentId: string) {
    return `webrtc-room:${appointmentId}`;
  }

  private async _canJoinAppointment(
    appointmentId: string,
    userId: string
  ): Promise<boolean> {
    return true;
  }
}
