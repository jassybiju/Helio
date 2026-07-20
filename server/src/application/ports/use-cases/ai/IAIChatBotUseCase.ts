export interface IAIChatBotUseCase {
  execute(
    patientId: string,
    message: string,
    converstationId?: string | null
  ): Promise<{ conversationId: string; message: string }>;
}
