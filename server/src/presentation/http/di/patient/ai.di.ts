import { AIChatBotUseCase } from "@application/use-cases/ai/AIChatBot/AIChatBotUseCase.ts";
import { AIController } from "../../controllers/ai.controller.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { LangchainQdrantVectorStoreService } from "@infrastructure/ai/vectorStore/LangchainQdrantVectorStoreService.ts";
import { LangGraphAIAgentService } from "@infrastructure/ai/agent/LangGraphAIAgentService.ts";
import { ChatGroq } from "@langchain/groq";
import { createChatGraph } from "@infrastructure/ai/graph/chat/chat.graph.ts";
import { MemorySaver } from "@langchain/langgraph";
import { createRetrieveTool } from "@infrastructure/ai/tools/retreve.tool.ts";
import { createGetAllDoctorsTool } from "@infrastructure/ai/tools/doctorList.tool.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";

const idGenerator = new NanoidGenerator();
const logger = PinoLoggerService.getInstance();
const vectorStore = await LangchainQdrantVectorStoreService.create();
const doctorRepo = new MongoDoctorRepository(logger);
const groqModel = new ChatGroq({ model: "llama-3.1-8b-instant" });

const retrieveTool = createRetrieveTool(vectorStore);
const getAllDoctorTool = await createGetAllDoctorsTool(doctorRepo);

const checkpointer = new MemorySaver();
const chatGraph = await createChatGraph(
  groqModel,
  [retrieveTool, getAllDoctorTool],
  checkpointer
);
const aiAgent = new LangGraphAIAgentService(chatGraph);
const aiChatBotUseCase = new AIChatBotUseCase(
  logger,
  idGenerator,
  vectorStore,
  aiAgent
);

export const aiController = new AIController(aiChatBotUseCase);
