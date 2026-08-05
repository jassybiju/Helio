export interface IPatientGetChatListDTO {
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
//# sourceMappingURL=IPatientGetChatListDTO.d.ts.map