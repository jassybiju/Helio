export interface IUserPresenceService {
    setOnline(userId: string, socketId: string): void;
    setOffline(userId: string, socketId: string): void;
    isOnline(userId: string): boolean;
    getSocketIds(userId: string): string[];
}
//# sourceMappingURL=IUserPresenceService.d.ts.map