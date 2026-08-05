import type { IGetMeResponseDTO } from "#application/dto/auth/IGetMeDTO.js";
import type { IGetMeHandler } from "#application/ports/use-cases/auth/IGetMeHandler.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IAdminRepository } from "#application/ports/repositories/IAdminRepository.js";
export declare class AdminGetMeHandler implements IGetMeHandler {
    private readonly _adminRepo;
    constructor(_adminRepo: IAdminRepository);
    supports(role: USER_ROLES): boolean;
    execute(id: string): Promise<IGetMeResponseDTO>;
}
//# sourceMappingURL=AdminGetMeHandler.d.ts.map