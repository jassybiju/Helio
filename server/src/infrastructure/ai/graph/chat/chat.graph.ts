import {
  END,
  MemorySaver,
  MessagesValue,
  ReducedValue,
  START,
  StateGraph,
  StateSchema,
  type GraphNode,
} from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import {
  DynamicStructuredTool,
  DynamicTool,
  Tool,
  tool,
} from "@langchain/core/tools";
import z from "zod";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage,
  trimMessages,
} from "@langchain/core/messages";
import { CHAT_SYSTEM_PROMPT } from "./chat.prompt.ts";
import { LangchainQdrantVectorStoreService } from "@infrastructure/ai/vectorStore/LangchainQdrantVectorStoreService.ts";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { createRetrieveTool } from "@infrastructure/ai/tools/retreve.tool.ts";
import { chatRouter } from "./chat.router.ts";
import { createGetAllDoctorsTool } from "@infrastructure/ai/tools/doctorList.tool.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { logger } from "@shared/utils/logger.utils.ts";

export async function createChatGraph(
  model: BaseChatModel,
  tools: (DynamicTool | DynamicStructuredTool)[],
  checkpointer: MemorySaver
) {
  // const toolCall = new ToolNode(debugTools);
  const modelWithTools = model.bindTools!(tools);

  const toolsByName = Object.fromEntries(
    tools.map((tool) => [tool.name, tool])
  ) as Record<string, DynamicTool | DynamicStructuredTool>;

  const toolCall: GraphNode<typeof MessagesState> = async (state) => {
    const lastMessage = state.messages.at(-1);

    if (lastMessage == null || !AIMessage.isInstance(lastMessage)) {
      return { messages: [] };
    }

    const result: ToolMessage[] = [];
    for (const toolCall of lastMessage.tool_calls ?? []) {
      const tool = toolsByName[toolCall.name];
      const observation = await tool?.invoke(toolCall);
      result.push(observation);
    }

    return { messages: result };
  };

  const MessagesState = new StateSchema({
    messages: MessagesValue,
    llmCalls: new ReducedValue(z.number().default(0), {
      reducer: (x, y) => x + y,
    }),
  });

  // This model is used to call the LLM and decide wheater to call a tool or not
  const llmCall: GraphNode<typeof MessagesState> = async (state) => {
    const messages = await trimMessages(state.messages, {
      maxTokens: 2000,
      strategy: "last",
      tokenCounter: model,
    });

    try {
      const response = await modelWithTools.invoke([
        new SystemMessage(CHAT_SYSTEM_PROMPT),
        ...messages,
      ]);

      logger.info("TYPE", response.type);
      return { messages: [response], llmCalls: 1 };
    } catch (err) {
      logger.error("LLM tool-call generation failed", {
        error: err instanceof Error ? err.message : String(err),
      });

      // Groq rejected a malformed function call before it reached our ToolNode.
      // Fall back to a plain response instead of crashing the graph.
      const fallback = await model.invoke([
        new SystemMessage(
          CHAT_SYSTEM_PROMPT +
            "\n\nNote: your previous attempt to call a tool used invalid " +
            "parameters. Answer the patient's last message directly in plain " +
            "text, without calling any tool, unless you are certain of the " +
            "exact required parameters."
        ),
        ...messages,
      ]);

      return { messages: [fallback], llmCalls: 1 };
    }
  };
  const graph = new StateGraph(MessagesState)
    .addNode("llmCall", llmCall)
    .addNode("toolCall", toolCall)
    .addEdge(START, "llmCall")
    .addConditionalEdges("llmCall", chatRouter, ["toolCall", END])
    .addEdge("toolCall", "llmCall")
    .compile({ checkpointer });

  return graph;
}
