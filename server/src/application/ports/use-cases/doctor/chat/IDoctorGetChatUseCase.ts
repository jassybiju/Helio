import type { IDoctorGetChatDTO } from "@application/use-cases/doctor/chat/getChat/IDoctorGetChatDTO.ts";

export interface IDoctorGetChatUseCase {
  execute(doctorId: string, chatSessionId: string): Promise<IDoctorGetChatDTO>;
}
