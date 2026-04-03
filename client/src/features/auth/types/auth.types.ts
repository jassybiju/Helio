import { USER_ROLES } from "@/src/types/user.types";

export type LoginResponse = {
  data: {
    email: string;
    id: string;
    isProfileComplete: boolean;
    role: USER_ROLES;
  },
  message : string,
  success : boolean

};

export type GoogleLoginFn = (credential: string) => Promise<void>;
export type LoginFn = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<void>;
