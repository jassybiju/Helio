export interface IDoctorSendMessageUseCase {
  execute(
    doctorId: string,
    chatSessionId: string,
    content: string
  ): Promise<void>;
}
