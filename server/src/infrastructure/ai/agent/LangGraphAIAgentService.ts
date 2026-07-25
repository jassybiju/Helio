import type { IAIAgentService } from "@application/ports/services/IAIAgentService.ts";
import { Command, type CompiledStateGraph } from "@langchain/langgraph";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import type { ILogger } from "@application/ports/services/ILogger.ts";

export class LangGraphAIAgentService implements IAIAgentService {
  constructor(
    private readonly _logger: ILogger,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly _chatGAgent: CompiledStateGraph<any, any, any, any, any>
  ) {}

  async chat(input: {
    conversationId: string;
    patientId: string;
    message: string;
  }): Promise<string> {
    const config = {
      configurable: {
        thread_id: input.conversationId,
        patientId: input.patientId,
      },
    };

    const state = await this._chatGAgent.getState(config);

    const isInterrupted = state.tasks.some(
      (task) => task.interrupts && task.interrupts.length > 0
    );

    let response;
    if (isInterrupted) {
      console.log("is calling interupted");
      response = await this._chatGAgent.invoke(
        new Command({ resume: input.message }),
        config
      );
    } else {
      response = await this._chatGAgent.invoke(
        {
          messages: [new HumanMessage(input.message)],
        },
        config
      );
    }

    const updatedState = await this._chatGAgent.getState(config);
    const currentTask = updatedState.tasks?.find(
      (t) => t.interrupts?.length > 0
    );

    if (currentTask) {
      const interruptValue = currentTask.interrupts[0]?.value;
      if (typeof interruptValue === "object" && interruptValue?.message) {
        return interruptValue.message;
      }
    }

    for (const message of response.messages) {
      const parsedText = contentToString(message.content);
      this._logger.debug(
        `[${message.type}]: ${message.type === "tool" ? parsedText : parsedText.slice(0, 50) || "(empty/tool call)"}`
      );
    }

    // FIX 1: Filter to find the LAST AIMessage that actually contains user-facing text
    const aiMessages = response.messages.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (msg: any) => AIMessage.isInstance(msg) && !msg.tool_calls?.length
    );

    const lastAiMessage = aiMessages.at(-1) ?? response.messages.at(-1);

    return lastAiMessage ? contentToString(lastAiMessage.content) : "";
  }

  async summarizeAppointment(_input: {
    appointmentId: string;
  }): Promise<string> {
    return "HI";
  }
}

/**
 * Enhanced content extractor for LangChain / Groq structured responses
 */
function contentToString(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (typeof block === "string") return block;
        if (typeof block === "object" && block !== null) {
          if ("text" in block && typeof block.text === "string") {
            return block.text;
          }
          if ("value" in block && typeof block.value === "string") {
            return block.value;
          }
        }
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }
  return "";
}
