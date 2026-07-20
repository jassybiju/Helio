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
import { createGetDoctorSlotTool } from "@infrastructure/ai/tools/doctorSlot.tool.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { DoctorBlockShiftRepository } from "@infrastructure/database/repositories/DoctorBlockShiftRepository.ts";
import { DoctorShiftRepository } from "@infrastructure/database/repositories/DoctorShiftRepository.ts";
import { SlotGenerator } from "@application/service/SlotGenerator.ts";
import { createSearchByNameTool } from "@infrastructure/ai/tools/searchByName.tool.ts";
import { DoctorEndConsultationUseCase } from "@application/use-cases/doctor/consultation/endConsultation/DoctorEndConsultationUseCase.ts";
import { createSearchAvailableDoctorsTool } from "@infrastructure/ai/tools/searchAvailableDoctor.tool.ts";

const idGenerator = new NanoidGenerator();
const logger = PinoLoggerService.getInstance();
const vectorStore = await LangchainQdrantVectorStoreService.create();
const doctorRepo = new MongoDoctorRepository(logger);
const groqModel = new ChatGroq({ model: "llama-3.1-8b-instant" });
const appointmentRepo = new AppointmentRepository(logger);
const blockSlotRepo = new DoctorBlockShiftRepository(logger);
const shiftRepo = new DoctorShiftRepository(logger);
const slotService = new SlotGenerator();

const retrieveTool = createRetrieveTool(vectorStore);
const getAllDoctorTool = createGetAllDoctorsTool(doctorRepo);
const getDoctorSlotTool = createGetDoctorSlotTool(
  shiftRepo,
  blockSlotRepo,
  appointmentRepo,
  doctorRepo,
  slotService
);
const searchAvailableDoctor = createSearchAvailableDoctorsTool(
  doctorRepo,
  shiftRepo,
  blockSlotRepo,
  appointmentRepo,
  slotService
);
const searchDoctorByQuery = createSearchByNameTool(doctorRepo);
const checkpointer = new MemorySaver();
const chatGraph = await createChatGraph(
  groqModel,
  [retrieveTool, searchDoctorByQuery, searchAvailableDoctor, getDoctorSlotTool],
  checkpointer
);
const aiAgent = new LangGraphAIAgentService(logger, chatGraph);
const aiChatBotUseCase = new AIChatBotUseCase(
  logger,
  idGenerator,
  vectorStore,
  aiAgent
);

export const aiController = new AIController(aiChatBotUseCase);
