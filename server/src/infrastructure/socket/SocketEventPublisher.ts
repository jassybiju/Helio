import type { IEventPublisher } from "@application/ports/IEventPublisher.ts";
import type { Server } from "socket.io";

export class SocketEventPublisher implements IEventPublisher {
  constructor(private readonly _io: Server) {}

  async publish(event: string, payload: unknown): Promise<void> {
    this._io.emit(event, payload);
  }
}
