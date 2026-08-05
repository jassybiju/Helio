import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export interface IPatientSendMessageUseCase {
  execute(
    patientId: string,
    chatSessionId: string,
    content: string
  ): Promise<{ id: string; message: string; sendBy: USER_ROLES; sendAt: Date }>;
}
