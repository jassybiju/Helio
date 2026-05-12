import type { ICreateAppointmentUseCase } from "@application/ports/use-cases/patient/appointments/ICreateAppointmentUseCase.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { NextFunction, Request, Response } from "express";
import { createPatientAppointmentSchema } from "../../../schemas/patient/appointment.schema.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { IGetAppointmentUseCase } from "@application/ports/use-cases/patient/appointments/IGetAppointmentUseCase.ts";
import type { ICheckoutAppointmentUseCase } from "@application/ports/use-cases/patient/appointments/ICheckoutAppointmentUseCase.ts";
import type { TRANSACTION_TYPE } from "@domain/common/enums/wallet.enum.ts";
import type { PAYMENT_TYPE } from "@domain/common/enums/appointment.enum.ts";

export class PatientAppointmentController {
  constructor(
    private readonly _createAppointment: ICreateAppointmentUseCase,
    private readonly _getAppointment: IGetAppointmentUseCase,
    private readonly _checkout: ICheckoutAppointmentUseCase
  ) {}

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

  getAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = req.user?.id;

      if (!patientId) {
        throw new AppError("Patient Id Requried", HTTPStatus.INTERNAL_ERROR);
      }

      const { appointmentId } = req.params;
      if (!appointmentId) {
        throw new AppError(
          "appointment Id Requried",
          HTTPStatus.INTERNAL_ERROR
        );
      }

      const response = await this._getAppointment.execute(
        patientId,
        appointmentId as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Appointment Got Successfully")
      );
    } catch (error) {
      next(error);
    }
  };

  checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { appointmentId } = req.params;
      const patientId = req.user?.id;
      const { type } = req.body;
      const response = await this._checkout.execute(
        appointmentId as string,
        patientId as string,
        type as PAYMENT_TYPE
      );
      console.log("success", "1231223");
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Checkout Suceesful")
      );
    } catch (error) {
      next(error);
    }
  };
}
