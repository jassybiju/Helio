import type { ICreateAppointmentUseCase } from "@application/ports/use-cases/patient/appointments/ICreateAppointmentUseCase.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { NextFunction, Request, Response } from "express";
import { createPatientAppointmentSchema } from "../../../schemas/patient/appointment.schema.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";

export class PatientAppointmentController {
  constructor(private readonly _createAppointment: ICreateAppointmentUseCase) {}

  createAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const patientId = req.user?.id;

      if (!patientId) {
        throw new AppError("Patient Id Requried", HTTPStatus.INTERNAL_ERROR);
      }

      const parsed = createPatientAppointmentSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._createAppointment.execute(
        patientId,
        parsed.data
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Appointment Created")
      );
    } catch (error) {
      next(error);
    }
  };
}
