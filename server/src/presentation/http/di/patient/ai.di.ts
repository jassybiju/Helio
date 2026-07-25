import { AIChatBotUseCase } from "@application/use-cases/ai/AIChatBot/AIChatBotUseCase.ts";
import { AIController } from "../../controllers/ai.controller.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { LangchainQdrantVectorStoreService } from "@infrastructure/ai/vectorStore/LangchainQdrantVectorStoreService.ts";
import { ChatGroq } from "@langchain/groq";
import { MemorySaver } from "@langchain/langgraph";
import { createRetrieveTool } from "@infrastructure/ai/tools/retreve.tool.ts";
import { createChatGraph } from "@infrastructure/ai/graph/chat/chat.graph.ts";
import { helioTools } from "@infrastructure/ai/tools/index.ts";
import { LangGraphAIAgentService } from "@infrastructure/ai/agent/LangGraphAIAgentService.ts";
const idGenerator = new NanoidGenerator();
const logger = PinoLoggerService.getInstance();
const vectorStore = await LangchainQdrantVectorStoreService.create();

const groqModel = new ChatGroq({ model: "llama-3.3-70b-versatile" });

const retrieveTool = createRetrieveTool(vectorStore);
// const getSpecialitiesTool = createGetSpecialtyTool(specialtyRepo);
const [
  getSpecialitiesTool,
  searchDoctorsTool,
  getDoctorDetailsTool,
  getDoctorSlotsTool,
  bookAppointmentTool,
  getPatientWalletTool,
] = helioTools;
const checkpointer = new MemorySaver();
const chatGraph = createChatGraph({
  model: groqModel,
  tools: {
    retrieve: retrieveTool,
    getSpecialties: getSpecialitiesTool!,
    getDoctors: searchDoctorsTool!,
    getDoctorSlots: getDoctorSlotsTool!,
    walletBalance: getPatientWalletTool!,
    bookAppointment: bookAppointmentTool!,
  },
  checkpointer,
});

const aiAgent = new LangGraphAIAgentService(logger, chatGraph);

const aiChatBotUseCase = new AIChatBotUseCase(
  logger,
  idGenerator,
  vectorStore,
  aiAgent
);

export const aiController = new AIController(aiChatBotUseCase);
