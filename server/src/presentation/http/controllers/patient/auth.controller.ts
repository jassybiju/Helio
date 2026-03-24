import type {
  IRegisterPatientRequestDTO,
  IRegisterPatientResponseDTO,
} from "@application/dto/patient/auth/IRegisterPatientDTO.ts";
import type { NextFunction, Request, Response } from "express";
import {
  patientLoginSchema,
  patientRegisterSchema,
  patientResendOTPSchema,
  patientVerifyOTPSchema,
} from "../../schemas/patient/auth.schema.ts";
import type { IRegisterPatientUseCase } from "@application/ports/use-cases/patient/auth/IRegisterPatientUseCase.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { apiResponse, successResponse } from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import type { IVerifyOTPUseCase } from "@application/ports/use-cases/auth/IVerifyOTPUseCase.ts";
import type {
  IResendOTPResponseDTO,
  IVerifyOTPResponseDTO,
} from "@application/dto/auth/IOTPDTO.ts";
import type { IResendOTPUseCase } from "@application/ports/use-cases/auth/IResendOTPUseCase.ts";
import type { ILoginUseCase } from "@application/ports/use-cases/auth/ILoginUseCase.ts";

export class PatientAuthController {
  constructor(
    private readonly _registerPatientUseCase: IRegisterPatientUseCase,
    private readonly _resendOTPUseCase: IResendOTPUseCase,
    private readonly _verifyOTPUseCase: IVerifyOTPUseCase,
    private readonly _loginPatientUseCase: ILoginUseCase
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientRegisterSchema.safeParse(req.body);
      if (!parsed.success) {
        console.log(parsed.error.issues[0]?.message, 123);
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

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientLoginSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._loginPatientUseCase.execute(parsed.data)
      return apiResponse(res, HTTPStatus.OK, successResponse(response.user, MESSAGE.LOGIN_SUCCESSFUL))
    } catch (error) {
      next(error);
    }
  };
}
