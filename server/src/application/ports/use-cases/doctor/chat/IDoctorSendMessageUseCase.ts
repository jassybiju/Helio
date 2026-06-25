import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export interface IDoctorSendMessageUseCase {
  execute(
    doctorId: string,
    chatSessionId: string,
    content: string
  ): Promise<{ id: string; message: string; sendBy: USER_ROLES; sendAt: Date }>;
}
