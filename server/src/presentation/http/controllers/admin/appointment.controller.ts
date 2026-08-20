import type { IGetAllAppointmentUseCase } from "#application/ports/use-cases/admin/appointments/IGetAllAppointmentUseCase.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import {
  apiResponse,
  successResponse,
} from "#shared/utils/apiReponse.utils.js";
import type { NextFunction, Request, Response } from "express";

export class AdminAppointmentController {
  constructor(
    private readonly _getAllAppointmentUseCase: IGetAllAppointmentUseCase
  ) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = req.query;
      const response = await this._getAllAppointmentUseCase.execute(params);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "APPOINTMENTS FETCH SUCCESFFULY")
      );
    } catch (error) {
      next(error);
    }
  };
}
