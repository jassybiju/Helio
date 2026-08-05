import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export type ILoginRequestDTO = {
  email: string;
  password: string;
};

export type ILoginResponseDTO = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    role: USER_ROLES;
    email: string;
  };
};
