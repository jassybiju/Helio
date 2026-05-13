import type {
  DoctorViewAllInput,
  IDoctorViewAllAppointmentUseCase,
} from "@application/ports/use-cases/doctor/appointment/IDoctorViewAllAppointmentUseCase.ts";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class DoctorAppointmentController {
  constructor(
    private readonly _getAllAppointments: IDoctorViewAllAppointmentUseCase
  ) {}

  getAllAppointments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = req.query as unknown;
      const doctorId = req.user?.id;
      console.log(query);
      if (!doctorId) {
        throw new UnauthorizedError("Doctor Id Not Found");
      }

      const response = await this._getAllAppointments.execute(
        doctorId,
        query as DoctorViewAllInput
      );
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "DOCTOR APPOINTEMNT GOT SUCCESFFULy")
      );
    } catch (error) {
      next(error);
    }
  };
}
