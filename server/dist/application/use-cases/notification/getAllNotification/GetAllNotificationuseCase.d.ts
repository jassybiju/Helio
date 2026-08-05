import type { INotificationRepository } from "#application/ports/repositories/INotificationRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetAllNotificationUseCase } from "#application/ports/use-cases/notification/IGetAllNotificationUseCase.js";
export declare class GetAllNotificationuseCase implements IGetAllNotificationUseCase {
    private readonly _logger;
    private readonly _notificationRepo;
    constructor(_logger: ILogger, _notificationRepo: INotificationRepository);
    execute(userId: string, page: number, limit: number): Promise<{
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
    }>;
}
//# sourceMappingURL=GetAllNotificationuseCase.d.ts.map