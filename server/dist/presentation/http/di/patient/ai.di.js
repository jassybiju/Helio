import { AIChatBotUseCase } from "#application/use-cases/ai/AIChatBot/AIChatBotUseCase.js";
import { AIController } from "../../controllers/ai.controller.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { LangchainQdrantVectorStoreService } from "#infrastructure/ai/vectorStore/LangchainQdrantVectorStoreService.js";
import { ChatGroq } from "@langchain/groq";
import { MemorySaver } from "@langchain/langgraph";
import { createRetrieveTool } from "#infrastructure/ai/tools/retreve.tool.js";
import { createChatGraph } from "#infrastructure/ai/graph/chat/chat.graph.js";
import { helioTools } from "#infrastructure/ai/tools/index.js";
import { LangGraphAIAgentService } from "#infrastructure/ai/agent/LangGraphAIAgentService.js";
const idGenerator = new NanoidGenerator();
const logger = PinoLoggerService.getInstance();
const vectorStore = await LangchainQdrantVectorStoreService.create();
const groqModel = new ChatGroq({ model: "llama-3.3-70b-versatile" });
const retrieveTool = createRetrieveTool(vectorStore);
// const getSpecialitiesTool = createGetSpecialtyTool(specialtyRepo);
const [getSpecialitiesTool, searchDoctorsTool, getDoctorDetailsTool, getDoctorSlotsTool, bookAppointmentTool, getPatientWalletTool,] = helioTools;
const checkpointer = new MemorySaver();
const chatGraph = createChatGraph({
    model: groqModel,
    tools: {
        retrieve: retrieveTool,
        getSpecialties: getSpecialitiesTool,
        getDoctors: searchDoctorsTool,
        getDoctorSlots: getDoctorSlotsTool,
        walletBalance: getPatientWalletTool,
        bookAppointment: bookAppointmentTool,
    },
    checkpointer,
});
const aiAgent = new LangGraphAIAgentService(logger, chatGraph);
const aiChatBotUseCase = new AIChatBotUseCase(logger, idGenerator, vectorStore, aiAgent);
export const aiController = new AIController(aiChatBotUseCase);
//# sourceMappingURL=ai.di.js.map