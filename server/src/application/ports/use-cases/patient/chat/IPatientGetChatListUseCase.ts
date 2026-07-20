import type { IPatientGetChatListDTO } from "@application/use-cases/patient/chat/getChatList/IPatientGetChatListDTO.ts";

export interface IPatientGetChatListUseCase {
  execute(patientId: string): Promise<IPatientGetChatListDTO>;
}
