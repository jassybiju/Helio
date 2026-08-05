import type { INotificationRepository } from "#application/ports/repositories/INotificationRepository.js";
import { BaseRepository } from "./BaseRepository.js";
import { type NotificationRaw } from "../model/NotificationModel.js";
import type { ClientSession } from "mongoose";
import type { ILogger } from "#application/ports/services/ILogger.js";
import { Notification } from "#domain/entities/Notification.js";
export declare class NotificationRepository extends BaseRepository<Notification, NotificationRaw> implements INotificationRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession);
    withSession(session: ClientSession): INotificationRepository;
    create(notification: Notification): Promise<void>;
    findById(id: string): Promise<Notification | null>;
    update(notification: Notification): Promise<void>;
    delete(id: string): Promise<void>;
    findAllByUserId(userId: string, limit: number, page: number): Promise<{
        notifications: Notification[];
        hasMore: boolean;
    }>;
}
//# sourceMappingURL=NotificationRepository.d.ts.map