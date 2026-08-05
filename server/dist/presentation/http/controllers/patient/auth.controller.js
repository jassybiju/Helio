import { patientForgetPasswordSchema, patientLoginSchema, patientRegisterSchema, patientResendOTPSchema, patientResetPasswordSchema, patientVerifyOTPSchema, } from "../../schemas/patient/auth.schema.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, sendToken, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class PatientAuthController {
    _registerPatientUseCase;
    _resendOTPUseCase;
    _verifyOTPUseCase;
    _loginPatientUseCase;
    _forgetPasswordUseCase;
    _resetPasswordUseCase;
    _googleLoginUseCase;
    constructor(_registerPatientUseCase, _resendOTPUseCase, _verifyOTPUseCase, _loginPatientUseCase, _forgetPasswordUseCase, _resetPasswordUseCase, _googleLoginUseCase) {
        this._registerPatientUseCase = _registerPatientUseCase;
        this._resendOTPUseCase = _resendOTPUseCase;
        this._verifyOTPUseCase = _verifyOTPUseCase;
        this._loginPatientUseCase = _loginPatientUseCase;
        this._forgetPasswordUseCase = _forgetPasswordUseCase;
        this._resetPasswordUseCase = _resetPasswordUseCase;
        this._googleLoginUseCase = _googleLoginUseCase;
    }
    register = async (req, res, next) => {
        try {
            const parsed = patientRegisterSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._registerPatientUseCase.execute(parsed.data);
            return res
                .status(HTTPStatus.CREATED)
                .json(successResponse(response, MESSAGE.OTP_SENT));
        }
        catch (error) {
            next(error);
        }
    };
    verify_otp = async (req, res, next) => {
        try {
            const parsed = patientVerifyOTPSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._verifyOTPUseCase.execute({
                ...parsed.data,
                context: "patient",
            });
            return res
                .status(HTTPStatus.OK)
                .json(successResponse(response, MESSAGE.OTP_VERIFIED));
        }
        catch (error) {
            next(error);
        }
    };
    resend_otp = async (req, res, next) => {
        try {
            const parsed = patientResendOTPSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._resendOTPUseCase.execute({
                ...parsed.data,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.RESEND_SUCCESSFUL));
        }
        catch (error) {
            next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            const parsed = patientLoginSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._loginPatientUseCase.execute(parsed.data);
            sendToken(res, response.accessToken, response.refreshToken);
            return apiResponse(res, HTTPStatus.OK, successResponse(response.user, MESSAGE.LOGIN_SUCCESSFUL));
        }
        catch (error) {
            next(error);
        }
    };
    forgetPassword = async (req, res, next) => {
        try {
            const parsed = patientForgetPasswordSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._forgetPasswordUseCase.execute({
                email: parsed.data.email,
                role: USER_ROLES.PATIENT,
            });
            return apiResponse(res, HTTPStatus.OK, successResponse(response, MESSAGE.FORGET_PASSWORD_SEND));
        }
        catch (error) {
            next(error);
        }
    };
    resetPassword = async (req, res, next) => {
        try {
            const parsed = patientResetPasswordSchema.safeParse(req.body);
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
                role: USER_ROLES.PATIENT,
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