import type { IGetAllNotificationUseCase } from "@application/ports/use-cases/notification/IGetAllNotificationUseCase.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class NotificationController {
  constructor(
    private readonly _getAllNotifications: IGetAllNotificationUseCase
  ) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id!;
      const query = req.query as unknown as { page: number; limit: number };

      const response = await this._getAllNotifications.execute(
        userId,
        query.page,
        query.limit
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "GOT MESSAGE SUCCESFFuly")
      );
    } catch (error) {
      next(error);
    }
  };
}
