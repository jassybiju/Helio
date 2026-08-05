import { Notification } from "#domain/entities/Notification.js";
import type { NotificationRaw } from "#infrastructure/database/model/NotificationModel.js";
export declare class NotificationMapper {
    static toDomain(raw: NotificationRaw): Notification;
    static toPersistance(domain: Notification): NotificationRaw;
}
//# sourceMappingURL=NotificationMapper.d.ts.map