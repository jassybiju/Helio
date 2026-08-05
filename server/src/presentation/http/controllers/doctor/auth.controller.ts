import type { IRegisterDoctorReponseDTO } from "#application/dto/doctor/auth/IRegisterDoctorDTO.js";
import type { IRegisterDoctorUseCase } from "#application/ports/use-cases/doctor/auth/IRegisterDoctorUseCase.js";
import type { NextFunction, Request, Response } from "express";
import {
  doctorForgetPasswordSchema,
  doctorLoginSchema,
  doctorRegisterSchema,
  doctorResendOTPSchema,
  doctorResetPasswordSchema,
  doctorVerifyOTPSchema,
} from "../../schemas/doctor/auth.schema.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import {
  apiResponse,
  sendToken,
  successResponse,
} from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
import type { IVerifyOTPUseCase } from "#application/ports/use-cases/auth/IVerifyOTPUseCase.js";
import type { IResendOTPResponseDTO } from "#application/dto/auth/IOTPDTO.js";
import type { IResendOTPUseCase } from "#application/ports/use-cases/auth/IResendOTPUseCase.js";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
import type { ILoginResponseDTO } from "#application/dto/auth/ILoginDTO.js";
import type { IForgetPasswordUseCase } from "#application/ports/use-cases/auth/IForgetPasswordUseCase.js";
import type { IResetPasswordUseCase } from "#application/ports/use-cases/auth/IResetPasswordUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IGoogleLoginUseCase } from "#application/ports/use-cases/auth/IGoogleLoginUseCase.js";

export class DoctorAuthController {
  constructor(
    private readonly _registerDoctorUseCase: IRegisterDoctorUseCase,
    private readonly _verifyOTPUseCase: IVerifyOTPUseCase,
    private readonly _resendOTPUseCase: IResendOTPUseCase,
    private readonly _loginUseCase: ILoginUseCase,
    private readonly _forgetPasswordUseCase: IForgetPasswordUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    private readonly _googleLoginUseCase: IGoogleLoginUseCase,
    private readonly _logger: ILogger
  ) {}
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns
   */
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = doctorRegisterSchema.safeParse(req.body);
      this._logger.debug("Body", req.files);
      if (!parsed.success) {
        this._logger.error("Zod Validation erorr", parsed.error);
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      if (!req.file || !req.file.buffer) {
        throw new AppError(
          "Document Required for registration",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const result = await this._registerDoctorUseCase.execute({
        ...parsed.data,
        document: req.file,
      });
      return res
        .status(HTTPStatus.CREATED)
        .json(
          successResponse<IRegisterDoctorReponseDTO>(
            result,
            MESSAGE.REGISTRATION_SUCCESSFUL
          )
        );
    } catch (error) {
      next(error);
    }
  };

  verify_otp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = doctorVerifyOTPSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._verifyOTPUseCase.execute({
        ...parsed.data,
        context: "doctor",
      });
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, MESSAGE.OTP_VERIFIED)
      );
    } catch (error) {
      next(error);
    }
  };

  resend_otp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = doctorResendOTPSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._resendOTPUseCase.execute({
        ...parsed.data,
      });
      return res
        .status(HTTPStatus.OK)
        .json(
          successResponse<IResendOTPResponseDTO>(
            response,
            MESSAGE.RESEND_SUCCESSFUL
          )
        );
    } catch (error) {
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
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = doctorLoginSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }
      const response = await this._loginUseCase.execute(parsed.data);

      sendToken(res, response.accessToken, response.refreshToken);

      return res
        .status(HTTPStatus.OK)
        .json(
          successResponse<ILoginResponseDTO["user"]>(
            response.user,
            MESSAGE.LOGIN_SUCCESSFUL
          )
        );
    } catch (error) {
      next(error);
    }
  };

  forgetPasword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = doctorForgetPasswordSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._forgetPasswordUseCase.execute({
        email: parsed.data.email,
        role: USER_ROLES.DOCTOR,
      });

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "RESET LINK SENT TO EMAIL ")
      );
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = doctorResetPasswordSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._resetPasswordUseCase.execute({
        token: parsed.data.token,
        newPassword: parsed.data.password,
      });

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "RESET LINK SENT TO EMAIL ")
      );
    } catch (error) {
      next(error);
    }
  };

  googleLogin = async (req: Request, res: Response, next: NextFunction) => {
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

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response.user, "USER GOOGLE LOGIN SUCCESFUL")
      );
    } catch (error) {
      next(error);
    }
  };
}
