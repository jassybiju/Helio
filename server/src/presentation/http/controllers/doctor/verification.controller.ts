import type { IGetVerificationDetailsUseCase } from "@application/ports/use-cases/doctor/verification/IGetVerificationDetailsUseCase.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class DoctorVerificationController {
  constructor(
    private readonly _getVerificationDetailsUseCase: IGetVerificationDetailsUseCase
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
}
