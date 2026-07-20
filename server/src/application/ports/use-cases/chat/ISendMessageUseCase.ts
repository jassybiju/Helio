import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export interface ISendMessageUseCase {
  execute(
    senderId: string,
    chatSessionId: string,
    senderType: USER_ROLES,
    content: string
  ): Promise<{ id: string; message: string; sendBy: USER_ROLES; sendAt: Date }>;
}
