import type { IDoctorGetChatListDTO } from "#application/use-cases/doctor/chat/getChatList/IDoctorGetChatListDTO.js";
export interface IDoctorGetChatListUseCase {
    execute(doctorId: string): Promise<IDoctorGetChatListDTO>;
}
//# sourceMappingURL=IDoctorGetChatListUseCase.d.ts.map