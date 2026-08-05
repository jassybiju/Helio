import type { IGetWalletUseCase } from "#application/ports/use-cases/wallet/IGetWalletUseCase.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type { NextFunction, Request, Response } from "express";
import { addMoneySchema, getWalletSchema } from "../schemas/wallet.schema.js";
import {
  apiResponse,
  successResponse,
} from "#shared/utils/apiReponse.utils.js";
import type { IAddMoneyUseCase } from "#application/ports/use-cases/wallet/IAddMoneyUseCase.js";
import { GetWalletMapper } from "#application/use-cases/wallet/getWallet/GetWalletMapper.js";
import type { IAddMoneyVerifyUseCase } from "#application/ports/use-cases/wallet/IAddMoneyVerifyUseCase.js";

export class WalletController {
  constructor(
    private readonly _getWalletUseCase: IGetWalletUseCase,
    private readonly _addMoneyUseCase: IAddMoneyUseCase,
    private readonly _verifyAddMoney: IAddMoneyVerifyUseCase
  ) {}

  verifyAddMoney = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { transactionId } = req.params;
      const patientId = req.user?.id as string;
      const body = req.body;
      const response = await this._verifyAddMoney.execute({
        transactionId: transactionId as string,
        userId: patientId,

        razorpay_order_id: body.razorpay_order_id,
        razorpay_payment_id: body.razorpay_payment_id,
        razorpay_signature: body.razorpay_signature,
      });
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Payment Verified Suceesful")
      );
    } catch (error) {
      next(error);
    }
  };
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
        successResponse(response, "Money Added Succesffuly")
      );
    } catch (error) {
      next(error);
    }
  };
}
