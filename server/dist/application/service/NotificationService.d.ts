import type { INotificationRepository } from "#application/ports/repositories/INotificationRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { INotificationService } from "#application/ports/services/INotificationService.js";
import type { IRealTimeNotifier } from "#application/ports/services/IRealTimeNotifier.js";
import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export declare class NotificationService implements INotificationService {
    private readonly _notificationRepo;
    private readonly _idGenerator;
    private readonly _realTimeNotifier;
    constructor(_notificationRepo: INotificationRepository, _idGenerator: IIDGenerator, _realTimeNotifier: IRealTimeNotifier);
    notify(userId: string, role: USER_ROLES, heading: string, message: string): Promise<void>;
}
//# sourceMappingURL=NotificationService.d.ts.map