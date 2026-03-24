import type { NextFunction, Request, Response } from "express";
import { adminLoginSchema } from "../../schemas/admin/auth.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { ILoginUseCase } from "@application/ports/use-cases/auth/ILoginUseCase.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";

export class AdminAuthController {
  constructor(private readonly _loginUsecase: ILoginUseCase) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = adminLoginSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._loginUsecase.execute(parsed.data);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response.user, MESSAGE.LOGIN_SUCCESSFUL)
      );
    } catch (error) {
      next(error);
    }
  };
}
