import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { Socket } from "socket.io";
export interface AuthenticatedSocket extends Socket {
    data: {
        user: {
            id: string;
            role: USER_ROLES;
        };
    };
}
//# sourceMappingURL=AuthenticatedSocket.d.ts.map