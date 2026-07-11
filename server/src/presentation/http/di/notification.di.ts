import { GetAllNotificationuseCase } from "@application/use-cases/notification/getAllNotification/GetAllNotificationuseCase.ts";
import { NotificationController } from "../controllers/notification.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { NotificationRepository } from "@infrastructure/database/repositories/NotificationRepository.ts";

const logger = PinoLoggerService.getInstance();
const notificationRepo = new NotificationRepository(logger);

const getAllNotificationuseCase = new GetAllNotificationuseCase(
  logger,
  notificationRepo
);

export const notificationController = new NotificationController(
  getAllNotificationuseCase
);
