import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export interface IGetChatDTO {
    chats: {
        id: string;
        message: string;
        sendBy: USER_ROLES;
        sendAt: Date;
    }[];
    sendee: {
        id: string;
        name: string;
        profilePic: string | null;
    };
    sessionId: string;
    isExpired: boolean;
}
//# sourceMappingURL=IGetChatDTO.d.ts.map