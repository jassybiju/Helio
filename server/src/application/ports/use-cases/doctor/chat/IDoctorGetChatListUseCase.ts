import type { IDoctorGetChatListDTO } from "@application/use-cases/doctor/chat/getChatList/IDoctorGetChatListDTO.ts";

export interface IDoctorGetChatListUseCase {
  execute(doctorId: string): Promise<IDoctorGetChatListDTO>;
}
