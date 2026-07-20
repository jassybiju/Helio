import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export interface IDoctorGetChatDTO {
  chats: {
    id: string;
    message: string;
    sendBy: USER_ROLES;
    sendAt: Date;
  }[];
  patient: {
    id: string;
    name: string;
    profilePic: string;
  };
  sessionId: string;
}
