import { DoctorSendMessageUseCase } from "@application/use-cases/doctor/chat/sendMessage/DoctorSendMessageUseCase.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { ChatMessageRepository } from "@infrastructure/database/repositories/ChatMessageRepository.ts";
import { ChatSessionRepository } from "@infrastructure/database/repositories/ChatSessionRepository.ts";
import { MongoUnitOfWork } from "@infrastructure/database/unitOfWork/MongoUnitOfWork.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { SocketRealTimeNotifier } from "@infrastructure/services/SocketRealTimeNotifier.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { SendMessageUseCase } from "@application/use-cases/chat/sendMessage/SendMessageUseCase.ts";
import { GetChatListUseCase } from "@application/use-cases/chat/getChatList/GetChatListUseCase.ts";
import { GetChatUseCase } from "@application/use-cases/chat/getChat/GetChatUseCase.ts";
import { DoctorChatController } from "../../controllers/doctor/chat.controller.ts";

const logger = new PinoLoggerService();
const doctorRepo = new MongoDoctorRepository(logger);
const chatMessageRepo = new ChatMessageRepository(logger);
const chatSessionRepo = new ChatSessionRepository(logger);
const patientRepo = new PatientRepository(logger);
const uow = new MongoUnitOfWork();

const socketRealTime = new SocketRealTimeNotifier();
const idGenerator = new NanoidGenerator();

const sendMessageUseCase = new SendMessageUseCase(
  logger,
  patientRepo,
  doctorRepo,
  chatSessionRepo,
  chatMessageRepo,
  idGenerator,
  socketRealTime,
  uow
);

const getChatListUseCase = new GetChatListUseCase(
  logger,
  doctorRepo,
  patientRepo,
  chatSessionRepo,
  chatMessageRepo
);
const getChatUseCase = new GetChatUseCase(
  logger,
  doctorRepo,
  patientRepo,
  chatSessionRepo,
  chatMessageRepo
);
export const doctorChatController = new DoctorChatController(
  sendMessageUseCase,
  getChatListUseCase,
  getChatUseCase
);
