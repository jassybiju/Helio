import type { INotificationRepository } from "@application/ports/repositories/INotificationRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetAllNotificationUseCase } from "@application/ports/use-cases/notification/IGetAllNotificationUseCase.ts";

export class GetAllNotificationuseCase implements IGetAllNotificationUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _notificationRepo: INotificationRepository
  ) {}
  async execute(
    userId: string,
    page: number,
    limit: number
  ): Promise<{
    notifications: {
      id: string;
      heading: string;
      message: string;
      isRead: boolean;
      createdAt: string;
    }[];
    page: number;
    limit: number;
    hasMore: boolean;
  }> {
    const { notifications, hasMore } =
      await this._notificationRepo.findAllByUserId(userId, limit, page);

    return {
      notifications: notifications.map((n) => ({
        id: n.id,
        heading: n.heading,
        message: n.message,
        isRead: n.isRead,
        createdAt: n.createdAt.toDateString(),
      })),
      page,
      limit,
      hasMore,
    };
  }
}
