import type { IUserPresenceService } from "@application/ports/IUserPresenceService.ts";

export class UserPresenceService implements IUserPresenceService {
  private readonly _onlineUsers = new Map<string, Set<string>>();

  setOnline(userId: string, socketId: string): void {
    const sockets = this._onlineUsers.get(userId) ?? new Set();

    sockets.add(socketId);
    this._onlineUsers.set(userId, sockets);
  }

  setOffline(userId: string, socketId: string): void {
    let sockets = this._onlineUsers.get(userId);

    if (!sockets) return;

    sockets.delete(socketId);

    if (sockets.size === 0) {
      this._onlineUsers.delete(userId);
    }
  }

  isOnline(userId: string): boolean {
    return this._onlineUsers.has(userId);
  }

  getSocketIds(userId: string): string[] {
    return [...(this._onlineUsers.get(userId) ?? [])];
  }
}
