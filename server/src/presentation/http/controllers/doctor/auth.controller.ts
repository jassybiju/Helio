import type {
  IRegisterDoctorReponseDTO,
  IRegisterDoctorRequestDTO,
} from "@application/dto/doctor/auth/IRegisterDoctorDTO.ts";
import type { IRegisterDoctorUseCase } from "@application/ports/use-cases/doctor/auth/IRegisterDoctorUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import {
  doctorRegisterSchema,
  doctorResendOTPSchema,
  doctorVerifyOTPSchema,
} from "../../schemas/doctor/auth.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { successResponse } from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import type { IVerifyOTPUseCase } from "@application/ports/use-cases/auth/IVerifyOTPUseCase.ts";
import type {
  IResendOTPResponseDTO,
  IVerifyOTPResponseDTO,
} from "@application/dto/auth/IOTPDTO.ts";
import type { IResendOTPUseCase } from "@application/ports/use-cases/auth/IResendOTPUseCase.ts";

export class DoctorAuthController {
  constructor(
    private readonly _registerDoctorUseCase: IRegisterDoctorUseCase,
    private readonly _verifyOTPUseCase: IVerifyOTPUseCase,
    private readonly _resendOTPUseCase: IResendOTPUseCase,
    private readonly _logger: ILogger
  ) {}

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
}
