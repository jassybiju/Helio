import type { IGetWalletUseCase } from "@application/ports/use-cases/wallet/IGetWalletUseCase.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { NextFunction, Request, Response } from "express";
import { addMoneySchema, getWalletSchema } from "../schemas/wallet.schema.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { IAddMoneyUseCase } from "@application/ports/use-cases/wallet/IAddMoneyUseCase.ts";
import { GetWalletMapper } from "@application/use-cases/wallet/getWallet/GetWalletMapper.ts";

export class WalletController {
  constructor(
    private readonly _getWalletUseCase: IGetWalletUseCase,
    private readonly _addMoneyUseCase: IAddMoneyUseCase
  ) {}

  getWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new AppError("UserId not found", HTTPStatus.INTERNAL_ERROR);
      }

      const parsed = getWalletSchema.safeParse(req.query);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const data = await this._getWalletUseCase.execute(userId, parsed.data);
      const response = GetWalletMapper.toDto(data);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Wallet Got Succesffuly")
      );
    } catch (error) {
      next(error);
    }
  };

  addMoney = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new AppError("UserId not found", HTTPStatus.INTERNAL_ERROR);
      }

      const parsed = addMoneySchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._addMoneyUseCase.execute(
        userId,
        parsed.data.amount
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, "Money Added Succesffuly")
      );
    } catch (error) {
      next(error);
    }
  };
}
