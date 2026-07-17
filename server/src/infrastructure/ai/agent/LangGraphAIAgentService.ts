import type { IAIAgentService } from "@application/ports/services/IAIAgentService.ts";
import type { Graph } from "@langchain/core/runnables/graph";
import type { CompiledGraph, CompiledStateGraph } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import type { ICompiledGraph } from "@shared/types/graph.types.ts";
import { logger } from "@shared/utils/logger.utils.ts";

export class LangGraphAIAgentService implements IAIAgentService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly _chatGraph: CompiledStateGraph<any, any, any, any, any>
  ) {}

  async chat(input: {
    conversationId: string;
    patientId: string;
    message: string;
  }): Promise<string> {
    const response = await this._chatGraph.invoke(
      { messages: new HumanMessage(input.message) },
      {
        configurable: {
          thread_id: input.conversationId,
          patientId: input.patientId,
        },
      }
    );

    for (let message of response.messages) {
      console.log(`[${message.type}]: ${message.content}`);
    }
    return response.messages.at(-1)?.content as string;
  }

  async summarizeAppointment(input: {
    appointmentId: string;
  }): Promise<string> {
    return "HI";
  }
}
