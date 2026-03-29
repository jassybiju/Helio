import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetMeUseCase } from "@application/ports/use-cases/auth/IGetMeUseCase.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class AuthController {
  constructor(private readonly _getMe: IGetMeUseCase) {}

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.user!;
      const response = await this._getMe.execute({ id, role });
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "USER Authorized")
      );
    } catch (error) {
      next(error);
    }
  };
}
