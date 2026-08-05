import type { IAIAgentService } from "#application/ports/services/IAIAgentService.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IVectorStoreService } from "#application/ports/services/IVectorStoreService.js";
import type { IAIChatBotUseCase } from "#application/ports/use-cases/ai/IAIChatBotUseCase.js";
export declare class AIChatBotUseCase implements IAIChatBotUseCase {
    private readonly _logger;
    private readonly _idGenerator;
    private readonly _vectorStore;
    private readonly _aiAgentService;
    constructor(_logger: ILogger, _idGenerator: IIDGenerator, _vectorStore: IVectorStoreService, _aiAgentService: IAIAgentService);
    execute(patientId: string, message: string, conversationId?: string): Promise<{
        conversationId: string;
        message: string;
    }>;
}
//# sourceMappingURL=AIChatBotUseCase.d.ts.map