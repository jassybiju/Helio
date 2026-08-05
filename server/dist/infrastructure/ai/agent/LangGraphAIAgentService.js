import { Command } from "@langchain/langgraph";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
export class LangGraphAIAgentService {
    _logger;
    _chatGAgent;
    constructor(_logger, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _chatGAgent) {
        this._logger = _logger;
        this._chatGAgent = _chatGAgent;
    }
    async chat(input) {
        const config = {
            configurable: {
                thread_id: input.conversationId,
                patientId: input.patientId,
            },
        };
        const state = await this._chatGAgent.getState(config);
        const isInterrupted = state.tasks.some((task) => task.interrupts && task.interrupts.length > 0);
        let response;
        if (isInterrupted) {
            console.log("is calling interupted");
            response = await this._chatGAgent.invoke(new Command({ resume: input.message }), config);
        }
        else {
            response = await this._chatGAgent.invoke({
                messages: [new HumanMessage(input.message)],
            }, config);
        }
        const updatedState = await this._chatGAgent.getState(config);
        const currentTask = updatedState.tasks?.find((t) => t.interrupts?.length > 0);
        if (currentTask) {
            const interruptValue = currentTask.interrupts[0]?.value;
            if (typeof interruptValue === "object" && interruptValue?.message) {
                return interruptValue.message;
            }
        }
        for (const message of response.messages) {
            const parsedText = contentToString(message.content);
            this._logger.debug(`[${message.type}]: ${message.type === "tool" ? parsedText : parsedText.slice(0, 50) || "(empty/tool call)"}`);
        }
        // FIX 1: Filter to find the LAST AIMessage that actually contains user-facing text
        const aiMessages = response.messages.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (msg) => AIMessage.isInstance(msg) && !msg.tool_calls?.length);
        const lastAiMessage = aiMessages.at(-1) ?? response.messages.at(-1);
        return lastAiMessage ? contentToString(lastAiMessage.content) : "";
    }
    async summarizeAppointment(_input) {
        return "HI";
    }
}
/**
 * Enhanced content extractor for LangChain / Groq structured responses
 */
function contentToString(content) {
    if (typeof content === "string")
        return content;
    if (Array.isArray(content)) {
        return content
            .map((block) => {
            if (typeof block === "string")
                return block;
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
//# sourceMappingURL=LangGraphAIAgentService.js.map