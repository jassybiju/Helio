import type { IPatientGetChatDTO } from "#application/use-cases/patient/chat/getChat/IPatientGetChatDTO.js";

export interface IPatientGetChatUseCase {
  execute(
    PatientId: string,
    chatSessionId: string
  ): Promise<IPatientGetChatDTO>;
}
