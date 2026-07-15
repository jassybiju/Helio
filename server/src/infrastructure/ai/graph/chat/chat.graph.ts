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
  const toolCall = new ToolNode(tools);
  const modelWithTools = model.bindTools!(tools);

  const MessagesState = new StateSchema({
    messages: MessagesValue,
    llmCalls: new ReducedValue(z.number().default(0), {
      reducer: (x, y) => x + y,
    }),
  });

  // This model is used to call the LLM and decide wheater to call a tool or not
  const llmCall: GraphNode<typeof MessagesState> = async (state) => {
    console.log(
      state.messages.map((m) => ({
        type: m.type,
        content: m.content,
      }))
    );
    const response = await modelWithTools.invoke([
      new SystemMessage(CHAT_SYSTEM_PROMPT),
      ...state.messages,
    ]);
    console.log("AI RESPONSE", response);

    return {
      messages: [response],
      llmCalls: 1,
    };
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
