import type { IAIAgentService } from "#application/ports/services/IAIAgentService.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IVectorStoreService } from "#application/ports/services/IVectorStoreService.js";
import type { IAIChatBotUseCase } from "#application/ports/use-cases/ai/IAIChatBotUseCase.js";

export class AIChatBotUseCase implements IAIChatBotUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _idGenerator: IIDGenerator,
    private readonly _vectorStore: IVectorStoreService,
    private readonly _aiAgentService: IAIAgentService
  ) {}
  async execute(
    patientId: string,
    message: string,
    conversationId?: string
  ): Promise<{ conversationId: string; message: string }> {
    this._logger.info("AI Chat Bot UseCase ", {
      patientId,
      message,
      conversationId,
    });
    let id = conversationId;
    if (!id) {
      id = this._idGenerator.generate(process.env.AICONV_PREFIX!);
    }

    const response = await this._aiAgentService.chat({
      conversationId: id,
      patientId,
      message,
    });
    return { conversationId: id, message: response };
  }
}
