import type { IGetChatDTO } from "#application/use-cases/chat/getChat/IGetChatDTO.js";
import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export interface IGetChatUseCase {
    execute(userId: string, chatSessionId: string, userRole: USER_ROLES): Promise<IGetChatDTO>;
}
//# sourceMappingURL=IGetChatUseCase.d.ts.map