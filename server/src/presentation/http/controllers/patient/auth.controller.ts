import type { IRegisterPatientResponseDTO } from "#application/dto/patient/auth/IRegisterPatientDTO.js";
import type { NextFunction, Request, Response } from "express";
import {
  patientForgetPasswordSchema,
  patientLoginSchema,
  patientRegisterSchema,
  patientResendOTPSchema,
  patientResetPasswordSchema,
  patientVerifyOTPSchema,
} from "../../schemas/patient/auth.schema.js";
import type { IRegisterPatientUseCase } from "#application/ports/use-cases/patient/auth/IRegisterPatientUseCase.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import {
  apiResponse,
  sendToken,
  successResponse,
} from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import type { IVerifyOTPUseCase } from "#application/ports/use-cases/auth/IVerifyOTPUseCase.js";
import type {
  IResendOTPResponseDTO,
  IVerifyOTPResponseDTO,
} from "#application/dto/auth/IOTPDTO.js";
import type { IResendOTPUseCase } from "#application/ports/use-cases/auth/IResendOTPUseCase.js";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
import type { IForgetPasswordUseCase } from "#application/ports/use-cases/auth/IForgetPasswordUseCase.js";
import type { IResetPasswordUseCase } from "#application/ports/use-cases/auth/IResetPasswordUseCase.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { IGoogleLoginUseCase } from "#application/ports/use-cases/auth/IGoogleLoginUseCase.js";

export class PatientAuthController {
  constructor(
    private readonly _registerPatientUseCase: IRegisterPatientUseCase,
    private readonly _resendOTPUseCase: IResendOTPUseCase,
    private readonly _verifyOTPUseCase: IVerifyOTPUseCase,
    private readonly _loginPatientUseCase: ILoginUseCase,
    private readonly _forgetPasswordUseCase: IForgetPasswordUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    private readonly _googleLoginUseCase: IGoogleLoginUseCase
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientRegisterSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._registerPatientUseCase.execute(parsed.data);
      return res
        .status(HTTPStatus.CREATED)
        .json(
          successResponse<IRegisterPatientResponseDTO>(
            response,
            MESSAGE.OTP_SENT
          )
        );
    } catch (error) {
      next(error);
    }
  };

  verify_otp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientVerifyOTPSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._verifyOTPUseCase.execute({
        ...parsed.data,
        context: "patient",
      });
      return res
        .status(HTTPStatus.OK)
        .json(
          successResponse<IVerifyOTPResponseDTO>(response, MESSAGE.OTP_VERIFIED)
        );
    } catch (error) {
      next(error);
    }
  };

  resend_otp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientResendOTPSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._resendOTPUseCase.execute({
        ...parsed.data,
      });
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse<IResendOTPResponseDTO>(
          response,
          MESSAGE.RESEND_SUCCESSFUL
        )
      );
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientLoginSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._loginPatientUseCase.execute(parsed.data);

      sendToken(res, response.accessToken, response.refreshToken);
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response.user, MESSAGE.LOGIN_SUCCESSFUL)
      );
    } catch (error) {
      next(error);
    }
  };

  forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientForgetPasswordSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._forgetPasswordUseCase.execute({
        email: parsed.data.email,
        role: USER_ROLES.PATIENT,
      });

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, MESSAGE.FORGET_PASSWORD_SEND)
      );
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientResetPasswordSchema.safeParse(req.body);

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
        role: USER_ROLES.PATIENT,
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
