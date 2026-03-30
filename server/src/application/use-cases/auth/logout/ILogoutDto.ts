import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export type ILogoutRequestDTO = {
  userId: string;
  refreshToken: string;
};
