import type { IGetMeResponseDTO } from "@application/dto/auth/IGetMeDTO.ts";
import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export interface IGetMeHandler {
  supports(role: USER_ROLES): boolean;
  execute(id: string): Promise<IGetMeResponseDTO>;
}
