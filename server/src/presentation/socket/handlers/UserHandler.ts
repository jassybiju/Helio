import type { Server } from "socket.io";

export class UserHandler {
  constructor(private readonly _io: Server) {}
}
