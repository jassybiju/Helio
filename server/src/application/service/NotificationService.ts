import type { INotificationRepository } from "@application/ports/repositories/INotificationRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { INotificationService } from "@application/ports/services/INotificationService.ts";
import type { IRealTimeNotifier } from "@application/ports/services/IRealTimeNotifier.ts";
import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { Notification } from "@domain/entities/Notification.ts";

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
