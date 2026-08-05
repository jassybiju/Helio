import type { IGetMeResponseDTO } from "#application/dto/auth/IGetMeDTO.js";
import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export interface IGetMeHandler {
  supports(role: USER_ROLES): boolean;
  execute(id: string): Promise<IGetMeResponseDTO>;
}
