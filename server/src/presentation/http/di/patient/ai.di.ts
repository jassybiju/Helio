import { AIChatBotUseCase } from "#application/use-cases/ai/AIChatBot/AIChatBotUseCase.js";
import { AIController } from "../../controllers/ai.controller.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { LangchainQdrantVectorStoreService } from "#infrastructure/ai/vectorStore/LangchainQdrantVectorStoreService.js";
import { createRetrieveTool } from "#infrastructure/ai/tools/retreve.tool.js";
import { LangGraphAIAgentService } from "#infrastructure/ai/agent/LangGraphAIAgentService.js";
import { bookingApp } from "#infrastructure/ai/graph/chat/chat.graph.js";
const idGenerator = new NanoidGenerator();
const logger = PinoLoggerService.getInstance();
const vectorStore = await LangchainQdrantVectorStoreService.create();

const retrieveTool = createRetrieveTool(vectorStore);

const graph = bookingApp;

const aiAgent = new LangGraphAIAgentService(logger, graph);

const aiChatBotUseCase = new AIChatBotUseCase(
  logger,
  idGenerator,
  vectorStore,
  aiAgent
);

export const aiController = new AIController(aiChatBotUseCase);
