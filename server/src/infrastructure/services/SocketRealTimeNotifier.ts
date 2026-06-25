import type { IRealTimeNotifier } from "@application/ports/services/IRealTimeNotifier.ts";
import { getIO } from "@config/socket.instance.ts";

export class SocketRealTimeNotifier implements IRealTimeNotifier {
  constructor() {}

  async emitToRoom(
    room: string,
    event: string,
    payload: unknown
  ): Promise<void> {
    console.log(`EVENT SEND to ${room}`);
    getIO().to(room).emit(event, payload);
  }
}
