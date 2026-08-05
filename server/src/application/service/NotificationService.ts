import type { INotificationRepository } from "#application/ports/repositories/INotificationRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { INotificationService } from "#application/ports/services/INotificationService.js";
import type { IRealTimeNotifier } from "#application/ports/services/IRealTimeNotifier.js";
import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Notification } from "#domain/entities/Notification.js";

export class NotificationService implements INotificationService {
  constructor(
    private readonly _notificationRepo: INotificationRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _realTimeNotifier: IRealTimeNotifier
  ) {}

  async notify(
    userId: string,
    role: USER_ROLES,
    heading: string,
    message: string
  ): Promise<void> {
    const NOTIFICATION_ID = this._idGenerator.generate(
      process.env.NOTIFICATION_PREFIX!
    );
    const notification = Notification.create({
      id: NOTIFICATION_ID,
      userId,
      role,
      heading,
      message,
    });

    await this._notificationRepo.create(notification);
    this._realTimeNotifier.emitToRoom(
      `user:${role}:${userId}`,
      "notification:new",
      {
        id: notification.id,
        heading: notification.heading,
        message: notification.message,
      }
    );
  }
}
