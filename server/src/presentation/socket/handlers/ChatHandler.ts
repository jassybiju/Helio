import type { Server, Socket } from "socket.io";

export class ChatHandler {
  constructor(private readonly _io: Server) {}

  register(socket: Socket) {
    socket.on("chat:");
  }
}
