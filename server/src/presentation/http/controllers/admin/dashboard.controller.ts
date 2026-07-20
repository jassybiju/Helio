import type { IGetAdminDashboardUseCase } from "@application/ports/use-cases/admin/IGetAdminDashboardUseCase.ts";
import type { BOOKING_PERIOD } from "@domain/common/enums/appointment.enum.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class AdminDashboardController {
  constructor(private readonly _dashboardUseCase: IGetAdminDashboardUseCase) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { period } = req.query;
      const response = await this._dashboardUseCase.execute(
        period as BOOKING_PERIOD
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "ADMIN DASHBOARD FETCH SUCCESFFULLLY ")
      );
    } catch (error) {
      next(error);
    }
  };
}
