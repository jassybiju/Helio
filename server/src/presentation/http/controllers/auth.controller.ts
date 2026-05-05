import type { IGetMeUseCase } from "@application/ports/use-cases/auth/IGetMeUseCase.ts";
import type { ILogoutUseCase } from "@application/ports/use-cases/auth/ILogoutUseCase.ts";
import type { IRefreshTokenUseCase } from "@application/ports/use-cases/auth/IRefreshTokenUseCase.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  removeToken,
  sendToken,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class AuthController {
  constructor(
    private readonly _getMe: IGetMeUseCase,
    private readonly _refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly _logoutUseCase: ILogoutUseCase
  ) {}

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

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new AppError("Invalid Refresh Token", HTTPStatus.UNAUTHORIZED);
      }
      const response = await this._refreshTokenUseCase.execute(refreshToken);

      sendToken(res, response.accessToken, response.refreshToken);
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Token Authorized")
      );
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new AppError("Invalid Refresh Token", HTTPStatus.UNAUTHORIZED);
      }
      await this._logoutUseCase.execute({
        userId: req.user?.id ?? "",
        refreshToken,
      });
      removeToken(res);
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, "Logout Successful")
      );
    } catch (error) {
      next(error);
    }
  };
}
