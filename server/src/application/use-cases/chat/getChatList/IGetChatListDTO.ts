export interface IGetChatListDTO {
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
      profilePic: string | null;
      message: string;
      expiresIn: string;
    }[];
  };
}
