import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export interface INotificationService {
    notify(userId: string, role: USER_ROLES, heading: string, message: string): Promise<void>;
}
//# sourceMappingURL=INotificationService.d.ts.map