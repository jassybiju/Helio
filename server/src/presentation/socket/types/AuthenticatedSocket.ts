import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import type { Socket } from "socket.io";

export interface AuthenticatedSocket extends Socket {
  data: {
    user: {
      id: string;
      role: USER_ROLES;
    };
  };
}
