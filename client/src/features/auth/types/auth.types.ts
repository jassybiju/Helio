import { USER_ROLES } from "@/src/types/user.types";

export type LoginResponse = {

    email: string;
    id: string;
    isProfileComplete: boolean;
    role: USER_ROLES;


};

export type GoogleLoginFn = (credential: string) => Promise<void>;
export type LoginFn = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<void>;
