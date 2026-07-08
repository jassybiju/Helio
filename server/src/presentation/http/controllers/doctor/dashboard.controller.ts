import type { IGetDoctorDashboardUseCase } from "@application/ports/use-cases/doctor/dashboard/IGetDoctorDashboardUseCase.ts";
import type { BOOKING_PERIOD } from "@domain/common/enums/appointment.enum.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class DoctorDashboardController {
  constructor(
    private readonly _getDoctorDashboard: IGetDoctorDashboardUseCase
  ) {}

  getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;
      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }
      const { period } = req.query;

      const response = await this._getDoctorDashboard.execute(
        doctorId,
        period as BOOKING_PERIOD
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "DOCTOR DASHBOARD FETCH SUCCESFULLY")
      );
    } catch (error) {
      next(error);
    }
  };
}
