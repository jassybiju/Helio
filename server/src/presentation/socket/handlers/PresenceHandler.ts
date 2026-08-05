import type { IUserPresenceService } from "#application/ports/IUserPresenceService.js";
import type { AuthenticatedSocket } from "../types/AuthenticatedSocket.js";

// responsible to connection lifecyle
export class PresenceHandler {
  constructor(private readonly _presenceService: IUserPresenceService) {}

  register(socket: AuthenticatedSocket) {
    const userId = socket.data.user.id;

    this._presenceService.setOnline(userId, socket.id);

    socket.on("presence:watch", (targetUserId: string) => {
      socket.join(this._room(targetUserId));
    });

    socket.on("disconnect", () => {
      this._presenceService.setOffline(userId, socket.id);
    });
  }

  private _room(userId: string) {
    return `presence:${userId}`;
  }
}
