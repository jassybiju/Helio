import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, removeToken, sendToken, successResponse, } from "#shared/utils/apiReponse.utils.js";
export class AuthController {
    _getMe;
    _refreshTokenUseCase;
    _logoutUseCase;
    constructor(_getMe, _refreshTokenUseCase, _logoutUseCase) {
        this._getMe = _getMe;
        this._refreshTokenUseCase = _refreshTokenUseCase;
        this._logoutUseCase = _logoutUseCase;
    }
    getMe = async (req, res, next) => {
        try {
            const { id, role } = req.user;
            const response = await this._getMe.execute({ id, role });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "USER Authorized"));
        }
        catch (error) {
            next(error);
        }
    };
    refresh = async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                throw new AppError("Invalid Refresh Token", HTTPStatus.UNAUTHORIZED);
            }
            const response = await this._refreshTokenUseCase.execute(refreshToken);
            sendToken(res, response.accessToken, response.refreshToken);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Token Authorized"));
        }
        catch (error) {
            next(error);
        }
    };
    logout = async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                throw new AppError("Invalid Refresh Token", HTTPStatus.UNAUTHORIZED);
            }
            await this._logoutUseCase.execute({
                userId: req.user?.id ?? "",
                refreshToken,
            });
            removeToken(res);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, "Logout Successful"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=auth.controller.js.map