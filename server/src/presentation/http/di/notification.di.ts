import { GetAllNotificationuseCase } from "#application/use-cases/notification/getAllNotification/GetAllNotificationuseCase.js";
import { NotificationController } from "../controllers/notification.controller.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { NotificationRepository } from "#infrastructure/database/repositories/NotificationRepository.js";

const logger = PinoLoggerService.getInstance();
const notificationRepo = new NotificationRepository(logger);

const getAllNotificationuseCase = new GetAllNotificationuseCase(
  logger,
  notificationRepo
);

export const notificationController = new NotificationController(
  getAllNotificationuseCase
);
