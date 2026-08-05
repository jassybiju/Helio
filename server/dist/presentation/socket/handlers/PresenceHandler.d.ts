import type { IUserPresenceService } from "#application/ports/IUserPresenceService.js";
import type { AuthenticatedSocket } from "../types/AuthenticatedSocket.js";
export declare class PresenceHandler {
    private readonly _presenceService;
    constructor(_presenceService: IUserPresenceService);
    register(socket: AuthenticatedSocket): void;
    private _room;
}
//# sourceMappingURL=PresenceHandler.d.ts.map