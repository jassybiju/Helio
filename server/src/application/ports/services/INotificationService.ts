import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export interface INotificationService {
  notify(
    userId: string,
    role: USER_ROLES,
    heading: string,
    message: string
  ): Promise<void>;
}
