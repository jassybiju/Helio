import { adminLoginSchema } from "../../schemas/admin/auth.schema.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, sendToken, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
export class AdminAuthController {
    _loginUsecase;
    constructor(_loginUsecase) {
        this._loginUsecase = _loginUsecase;
    }
    login = async (req, res, next) => {
        try {
            const parsed = adminLoginSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._loginUsecase.execute(parsed.data);
            sendToken(res, response.accessToken, response.refreshToken);
            return apiResponse(res, HTTPStatus.OK, successResponse(response.user, MESSAGE.LOGIN_SUCCESSFUL));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=auth.controller.js.map