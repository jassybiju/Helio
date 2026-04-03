import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export type IGoogleLoginResponseDTO = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    role: USER_ROLES;
    email: string;
    isProfileComplete: boolean;
  };
};
