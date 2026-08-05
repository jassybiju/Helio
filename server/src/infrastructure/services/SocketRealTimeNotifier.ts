import type { IRealTimeNotifier } from "#application/ports/services/IRealTimeNotifier.js";
import { getIO } from "#config/socket.instance.js";

export class SocketRealTimeNotifier implements IRealTimeNotifier {
  constructor() {}

  async emitToRoom(
    room: string,
    event: string,
    payload: unknown
  ): Promise<void> {
    getIO().to(room).emit(event, payload);
  }
}
