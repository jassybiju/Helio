import type { USER_ROLES } from "@shared/types/UserRoles.ts";

export type ILoginRequestDTO = {
  email: string;
  password: string;
};

export type ILoginResponseDTO = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    role: USER_ROLES
    email: string;
  };
};
