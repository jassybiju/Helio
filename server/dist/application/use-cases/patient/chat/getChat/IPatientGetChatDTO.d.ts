import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export interface IPatientGetChatDTO {
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
//# sourceMappingURL=IPatientGetChatDTO.d.ts.map