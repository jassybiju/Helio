import { doctorForgetPasswordSchema, doctorLoginSchema, doctorRegisterSchema, doctorResendOTPSchema, doctorResetPasswordSchema, doctorVerifyOTPSchema, } from "../../schemas/doctor/auth.schema.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, sendToken, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class DoctorAuthController {
    _registerDoctorUseCase;
    _verifyOTPUseCase;
    _resendOTPUseCase;
    _loginUseCase;
    _forgetPasswordUseCase;
    _resetPasswordUseCase;
    _googleLoginUseCase;
    _logger;
    constructor(_registerDoctorUseCase, _verifyOTPUseCase, _resendOTPUseCase, _loginUseCase, _forgetPasswordUseCase, _resetPasswordUseCase, _googleLoginUseCase, _logger) {
        this._registerDoctorUseCase = _registerDoctorUseCase;
        this._verifyOTPUseCase = _verifyOTPUseCase;
        this._resendOTPUseCase = _resendOTPUseCase;
        this._loginUseCase = _loginUseCase;
        this._forgetPasswordUseCase = _forgetPasswordUseCase;
        this._resetPasswordUseCase = _resetPasswordUseCase;
        this._googleLoginUseCase = _googleLoginUseCase;
        this._logger = _logger;
    }
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns
     */
    register = async (req, res, next) => {
        try {
            const parsed = doctorRegisterSchema.safeParse(req.body);
            this._logger.debug("Body", req.files);
            if (!parsed.success) {
                this._logger.error("Zod Validation erorr", parsed.error);
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            if (!req.file || !req.file.buffer) {
                throw new AppError("Document Required for registration", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const result = await this._registerDoctorUseCase.execute({
                ...parsed.data,
                document: req.file,
            });
            return res
                .status(HTTPStatus.CREATED)
                .json(successResponse(result, MESSAGE.REGISTRATION_SUCCESSFUL));
        }
        catch (error) {
            next(error);
        }
    };
    verify_otp = async (req, res, next) => {
        try {
            const parsed = doctorVerifyOTPSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._verifyOTPUseCase.execute({
                ...parsed.data,
                context: "doctor",
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.OTP_VERIFIED));
        }
        catch (error) {
            next(error);
        }
    };
    resend_otp = async (req, res, next) => {
        try {
            const parsed = doctorResendOTPSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._resendOTPUseCase.execute({
                ...parsed.data,
            });
            return res
                .status(HTTPStatus.OK)
                .json(successResponse(response, MESSAGE.RESEND_SUCCESSFUL));
        }
        catch (error) {
            next(error);
        }
    };
    /**
     * Doctor Login Controller validates req.body using zod and return user res
     * with AccessToken and refresh token as cookie
     *
     * @param req
     * @param res
     * @param next
     */
    login = async (req, res, next) => {
        try {
            const parsed = doctorLoginSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._loginUseCase.execute(parsed.data);
            sendToken(res, response.accessToken, response.refreshToken);
            return res
                .status(HTTPStatus.OK)
                .json(successResponse(response.user, MESSAGE.LOGIN_SUCCESSFUL));
        }
        catch (error) {
            next(error);
        }
    };
    forgetPasword = async (req, res, next) => {
        try {
            const parsed = doctorForgetPasswordSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._forgetPasswordUseCase.execute({
                email: parsed.data.email,
                role: USER_ROLES.DOCTOR,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "RESET LINK SENT TO EMAIL "));
        }
        catch (error) {
            next(error);
        }
    };
    resetPassword = async (req, res, next) => {
        try {
            const parsed = doctorResetPasswordSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._resetPasswordUseCase.execute({
                token: parsed.data.token,
                newPassword: parsed.data.password,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "RESET LINK SENT TO EMAIL "));
        }
        catch (error) {
            next(error);
        }
    };
    googleLogin = async (req, res, next) => {
        try {
            const { credential } = req.body;
            if (!credential) {
                throw new AppError("Credentials is required", HTTPStatus.BAD_REQUEST);
            }
            const response = await this._googleLoginUseCase.execute({
                credentials: credential,
                role: USER_ROLES.DOCTOR,
            });
            sendToken(res, response.accessToken, response.refreshToken);
            return apiResponse(res, HTTPStatus.OK, successResponse(response.user, "USER GOOGLE LOGIN SUCCESFUL"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=auth.controller.js.map