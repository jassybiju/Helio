import type { Notification } from "#domain/entities/Notification.js";
import type { ClientSession } from "mongoose";
export interface INotificationRepository {
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
//# sourceMappingURL=INotificationRepository.d.ts.map