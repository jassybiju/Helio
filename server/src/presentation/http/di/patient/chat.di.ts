import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { ChatMessageRepository } from "@infrastructure/database/repositories/ChatMessageRepository.ts";
import { ChatSessionRepository } from "@infrastructure/database/repositories/ChatSessionRepository.ts";
import { MongoUnitOfWork } from "@infrastructure/database/unitOfWork/MongoUnitOfWork.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { SocketRealTimeNotifier } from "@infrastructure/services/SocketRealTimeNotifier.ts";
import { GetChatListUseCase } from "@application/use-cases/chat/getChatList/GetChatListUseCase.ts";
import { GetChatUseCase } from "@application/use-cases/chat/getChat/GetChatUseCase.ts";
import { PatientChatController } from "../../controllers/patient/chat.controller.ts";
import { SendMessageUseCase } from "@application/use-cases/chat/sendMessage/SendMessageUseCase.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { CloudinaryFileUploadService } from "@infrastructure/services/CloudinaryFileUploadService.ts";

const logger = new PinoLoggerService();
const doctorRepo = new MongoDoctorRepository(logger);
const chatMessageRepo = new ChatMessageRepository(logger);
const chatSessionRepo = new ChatSessionRepository(logger);
const patientRepo = new PatientRepository(logger);
const uow = new MongoUnitOfWork();
const fileUpload = new CloudinaryFileUploadService();

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
  chatMessageRepo,
  fileUpload
);
const getChatUseCase = new GetChatUseCase(
  logger,
  doctorRepo,
  patientRepo,
  chatSessionRepo,
  chatMessageRepo,
  fileUpload
);
export const patientChatController = new PatientChatController(
  sendMessageUseCase,
  getChatListUseCase,
  getChatUseCase
);
