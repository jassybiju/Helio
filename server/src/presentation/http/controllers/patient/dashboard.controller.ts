import type { IGetPatientDashboardUseCase } from "#application/ports/use-cases/patient/dashboard/IGetPatientDashboardUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import {
  apiResponse,
  successResponse,
} from "#shared/utils/apiReponse.utils.js";
import type { NextFunction, Request, Response } from "express";

export class PatientDashboardController {
  constructor(private readonly _getDashboard: IGetPatientDashboardUseCase) {}

  getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = req.user?.id;

      if (!patientId) {
        throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
      }
      const response = await this._getDashboard.execute(patientId);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Patient Dashboard Got Successfully")
      );
    } catch (error) {
      next(error);
    }
  };
}
