import type { IPatientGetChatListDTO } from "#application/use-cases/patient/chat/getChatList/IPatientGetChatListDTO.js";
export interface IPatientGetChatListUseCase {
    execute(patientId: string): Promise<IPatientGetChatListDTO>;
}
//# sourceMappingURL=IPatientGetChatListUseCase.d.ts.map