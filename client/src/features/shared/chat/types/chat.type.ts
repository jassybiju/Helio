import { USER_ROLES } from "@/src/types/user.types";

export interface ChatMessageType {
  id: string;
  message: string;
  sendBy: USER_ROLES;
  sendAt: Date;
  status? : string
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

export interface ChatType {

  chats: ChatMessageType[];
  sendee: SendeeType;
  sessionId: string;
  isExpired : boolean
}
