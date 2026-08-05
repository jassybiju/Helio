import { Notification } from "#domain/entities/Notification.js";
export class NotificationMapper {
    static toDomain(raw) {
        return new Notification(raw._id, raw.user_id, raw.role, raw.heading, raw.message, raw.is_read, new Date(raw.created_at));
    }
    static toPersistance(domain) {
        return {
            _id: domain.id,
            user_id: domain.userId,
            role: domain.role,
            heading: domain.heading,
            message: domain.message,
            is_read: domain.isRead,
            created_at: domain.createdAt,
            is_deleted: false,
        };
    }
}
//# sourceMappingURL=NotificationMapper.js.map