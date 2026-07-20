import type { IGetChatListDTO } from "@application/use-cases/chat/getChatList/IGetChatListDTO.ts";
import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export interface IGetChatListUseCase {
  execute(userId: string, userType: USER_ROLES): Promise<IGetChatListDTO>;
}
