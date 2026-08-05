import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export interface IForgetPasswordUseCase {
  execute({ email, role }: { email: string; role: USER_ROLES }): Promise<void>;
}
