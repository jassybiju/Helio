import type { IGetVerificationDetailsUseCase } from "@application/ports/use-cases/doctor/verification/IGetVerificationDetailsUseCase.ts";
import type { IResubmitVerificationUseCase } from "@application/ports/use-cases/doctor/verification/IResubmitVerificationUseCase.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class DoctorVerificationController {
  constructor(
    private readonly _getVerificationDetailsUseCase: IGetVerificationDetailsUseCase,
    private readonly _resubmitVerificationUseCase: IResubmitVerificationUseCase
  ) {}

  getVerificationDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.id;

      const response =
        await this._getVerificationDetailsUseCase.execute(userId);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(
          response,
          "Doctor Verification Response Got Successfulyy"
        )
      );
    } catch (error) {
      next(error);
    }
  };

  resubmitVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.id;
      const { additionalInfo } = req.body;

      if (!additionalInfo) {
        throw new AppError(
          "Additional Info is required",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }
      await this._resubmitVerificationUseCase.execute(userId, {
        document: req.file!,
        additionalInfo,
      });

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse({}, "Doctor Resubmitted Successfully")
      );
    } catch (error) {
      next(error);
    }
  };
}
