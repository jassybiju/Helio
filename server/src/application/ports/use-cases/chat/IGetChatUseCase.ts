import type { IGetChatDTO } from "@application/use-cases/chat/getChat/IGetChatDTO.ts";
import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export interface IGetChatUseCase {
  execute(
    userId: string,
    chatSessionId: string,
    userRole: USER_ROLES
  ): Promise<IGetChatDTO>;
}
