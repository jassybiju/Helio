import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class AdminGetMeHandler {
    _adminRepo;
    constructor(_adminRepo) {
        this._adminRepo = _adminRepo;
    }
    supports(role) {
        return role === USER_ROLES.ADMIN;
    }
    async execute(id) {
        const admin = await this._adminRepo.findById(id);
        if (!admin) {
            throw new AppError("No Valid Credientals", HTTPStatus.UNAUTHORIZED);
        }
        return {
            id: admin.id,
            email: admin.email.value,
            role: USER_ROLES.ADMIN,
            isProfileComplete: true,
            profilePic: null,
        };
    }
}
//# sourceMappingURL=AdminGetMeHandler.js.map