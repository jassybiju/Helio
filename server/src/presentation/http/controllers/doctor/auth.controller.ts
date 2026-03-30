import type { IRegisterDoctorReponseDTO } from "@application/dto/doctor/auth/IRegisterDoctorDTO.ts";
import type { IRegisterDoctorUseCase } from "@application/ports/use-cases/doctor/auth/IRegisterDoctorUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import {
  doctorForgetPasswordSchema,
  doctorLoginSchema,
  doctorRegisterSchema,
  doctorResendOTPSchema,
  doctorResetPasswordSchema,
  doctorVerifyOTPSchema,
} from "../../schemas/doctor/auth.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import {
  apiResponse,
  sendToken,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import type { IVerifyOTPUseCase } from "@application/ports/use-cases/auth/IVerifyOTPUseCase.ts";
import type { IResendOTPResponseDTO } from "@application/dto/auth/IOTPDTO.ts";
import type { IResendOTPUseCase } from "@application/ports/use-cases/auth/IResendOTPUseCase.ts";
import type { ILoginUseCase } from "@application/ports/use-cases/auth/ILoginUseCase.ts";
import type { ILoginResponseDTO } from "@application/dto/auth/ILoginDTO.ts";
import type { IForgetPasswordUseCase } from "@application/ports/use-cases/auth/IForgetPasswordUseCase.ts";
import type { IResetPasswordUseCase } from "@application/ports/use-cases/auth/IResetPasswordUseCase.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export class DoctorAuthController {
  constructor(
    private readonly _registerDoctorUseCase: IRegisterDoctorUseCase,
    private readonly _verifyOTPUseCase: IVerifyOTPUseCase,
    private readonly _resendOTPUseCase: IResendOTPUseCase,
    private readonly _loginUseCase: ILoginUseCase,
    private readonly _forgetPasswordUseCase: IForgetPasswordUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
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
}
