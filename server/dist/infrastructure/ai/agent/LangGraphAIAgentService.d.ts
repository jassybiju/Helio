import type { IAIAgentService } from "#application/ports/services/IAIAgentService.js";
import { type CompiledStateGraph } from "@langchain/langgraph";
import type { ILogger } from "#application/ports/services/ILogger.js";
export declare class LangGraphAIAgentService implements IAIAgentService {
    private readonly _logger;
    private readonly _chatGAgent;
    constructor(_logger: ILogger, _chatGAgent: CompiledStateGraph<any, any, any, any, any>);
    chat(input: {
        conversationId: string;
        patientId: string;
        message: string;
    }): Promise<string>;
    summarizeAppointment(_input: {
        appointmentId: string;
    }): Promise<string>;
}
//# sourceMappingURL=LangGraphAIAgentService.d.ts.map