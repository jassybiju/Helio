import type { IDoctorGetChatDTO } from "#application/use-cases/doctor/chat/getChat/IDoctorGetChatDTO.js";
export interface IDoctorGetChatUseCase {
    execute(doctorId: string, chatSessionId: string): Promise<IDoctorGetChatDTO>;
}
//# sourceMappingURL=IDoctorGetChatUseCase.d.ts.map