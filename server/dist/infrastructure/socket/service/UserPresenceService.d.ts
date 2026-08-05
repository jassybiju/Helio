import type { IUserPresenceService } from "#application/ports/IUserPresenceService.js";
export declare class UserPresenceService implements IUserPresenceService {
    private readonly _onlineUsers;
    setOnline(userId: string, socketId: string): void;
    setOffline(userId: string, socketId: string): void;
    isOnline(userId: string): boolean;
    getSocketIds(userId: string): string[];
}
//# sourceMappingURL=UserPresenceService.d.ts.map