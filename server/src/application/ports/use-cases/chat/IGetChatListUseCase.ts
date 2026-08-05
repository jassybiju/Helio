import type { IGetChatListDTO } from "#application/use-cases/chat/getChatList/IGetChatListDTO.js";
import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export interface IGetChatListUseCase {
  execute(userId: string, userType: USER_ROLES): Promise<IGetChatListDTO>;
}
