import type {
  IRegisterDoctorReponseDTO,
  IRegisterDoctorRequestDTO,
} from "@application/dto/doctor/auth/IRegisterDoctorDTO.ts";
import type { IRegisterDoctorUseCase } from "@application/ports/use-cases/doctor/auth/IRegisterDoctorUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import {
  doctorLoginSchema,
  doctorRegisterSchema,
  doctorResendOTPSchema,
  doctorVerifyOTPSchema,
} from "../../schemas/doctor/auth.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import type { IVerifyOTPUseCase } from "@application/ports/use-cases/auth/IVerifyOTPUseCase.ts";
import type {
  IResendOTPResponseDTO,
  IVerifyOTPResponseDTO,
} from "@application/dto/auth/IOTPDTO.ts";
import type { IResendOTPUseCase } from "@application/ports/use-cases/auth/IResendOTPUseCase.ts";
import type { ILoginUseCase } from "@application/ports/use-cases/auth/ILoginUseCase.ts";
import type { ILoginResponseDTO } from "@application/dto/auth/ILoginDTO.ts";

export class DoctorAuthController {
  constructor(
    private readonly _registerDoctorUseCase: IRegisterDoctorUseCase,
    private readonly _verifyOTPUseCase: IVerifyOTPUseCase,
    private readonly _resendOTPUseCase: IResendOTPUseCase,
    private readonly _loginUseCase: ILoginUseCase,
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
      const ACCESS_TOKEN_EXPIRY_MS =
        Number(process.env.JWT_ACCESS_VALID_SECS) * 1000;
      const REFRESH_TOKEN_EXPIRY_MS =
        Number(process.env.JWT_REFRESH_VALID_SECS) * 1000;
      res.cookie("refreshToken", response.refreshToken, {
        maxAge: REFRESH_TOKEN_EXPIRY_MS,
        httpOnly: true,
        domain: ".helixo.local",
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("accessToken", response.accessToken, {
        maxAge: ACCESS_TOKEN_EXPIRY_MS,
        httpOnly: true,
        sameSite: "lax",
        domain: ".helixo.local",

        secure: false,
      });
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
}
