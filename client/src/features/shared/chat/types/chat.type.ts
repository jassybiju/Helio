import { USER_ROLES } from "@/src/types/user.types";

export interface ChatType {
  id: string;
  message: string;
  sendBy: USER_ROLES;
  sendAt: Date;
}
export interface SendeeType {
  id: string;
  name: string;
  profilePic: string;
}
export interface ChatListType {
  chats: {
    expired: {
      id: string;
      name: string;
      profilePic: string;
      message: string;
      expiresIn: string;
    }[];
    active: {
      id: string;

      name: string;
      profilePic: string;
      message: string;
      expiresIn: string;
    }[];
  };
}
