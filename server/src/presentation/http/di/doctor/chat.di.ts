import { DoctorSendMessageUseCase } from "@application/use-cases/doctor/chat/sendMessage/DoctorSendMessageUseCase.ts";
import { DoctorChatController } from "../../controllers/doctor/chat.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { ChatMessageRepository } from "@infrastructure/database/repositories/ChatMessageRepository.ts";
import { ChatSessionRepository } from "@infrastructure/database/repositories/ChatSessionRepository.ts";
import { MongoUnitOfWork } from "@infrastructure/database/unitOfWork/MongoUnitOfWork.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { SocketRealTimeNotifier } from "@infrastructure/services/SocketRealTimeNotifier.ts";
import { getIO } from "@config/socket.instance.ts";

const logger = new PinoLoggerService();
const doctorRepo = new MongoDoctorRepository(logger);
const chatMessageRepo = new ChatMessageRepository(logger);
const chatSessionRepo = new ChatSessionRepository(logger);
const uow = new MongoUnitOfWork();

const socketRealTime = new SocketRealTimeNotifier();
const idGenerator = new NanoidGenerator();

const doctorSendMessageUseCase = new DoctorSendMessageUseCase(
  logger,
  doctorRepo,
  chatSessionRepo,
  chatMessageRepo,
  idGenerator,
  socketRealTime,
  uow
);

export const doctorChatController = new DoctorChatController(
  doctorSendMessageUseCase
);
