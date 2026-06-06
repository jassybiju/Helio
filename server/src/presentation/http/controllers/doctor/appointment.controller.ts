import type { IDoctorStartConsultationUseCase } from "@application/ports/use-cases/doctor/appointment/IDoctorStartConsultationUseCase.ts";
import type {
  DoctorViewAllInput,
  IDoctorViewAllAppointmentUseCase,
} from "@application/ports/use-cases/doctor/appointment/IDoctorViewAllAppointmentUseCase.ts";
import type { IDoctorViewAppointmentUseCase } from "@application/ports/use-cases/doctor/appointment/IDoctorViewAppointmentUseCase.ts";
import type { IDoctorViewTodaysAppointmentUseCase } from "@application/ports/use-cases/doctor/appointment/IDoctorViewTodaysAppointmentUseCase.ts";
import type { ISkipDoctorAppointmentUseCase } from "@application/ports/use-cases/doctor/appointment/ISkipDoctorAppointmentUseCase.ts";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class DoctorAppointmentController {
  constructor(
    private readonly _getAllAppointments: IDoctorViewAllAppointmentUseCase,
    private readonly _getAppointment: IDoctorViewAppointmentUseCase,
    private readonly _startConsultation: IDoctorStartConsultationUseCase,
    private readonly _viewTodaysAppointment: IDoctorViewTodaysAppointmentUseCase,
    private readonly _skipAppointment : ISkipDoctorAppointmentUseCase,
  ) {}

  getTodaysAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const doctorId = req.user?.id;
      if (!doctorId) {
        throw new UnauthorizedError("Doctor Id Not Found");
      }

      const response = await this._viewTodaysAppointment.execute(doctorId);
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "DOCTOR TODAYS APPOINTEMNT GOT SUCCESFFULy")
      );
    } catch (error) {
      next(error);
    }
  };

  getAllAppointments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = req.query as unknown;
      const doctorId = req.user?.id;
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

  getAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { appointmentId } = req.params;

      const doctorId = req.user?.id;
      if (!doctorId) {
        throw new UnauthorizedError("Doctor Id Not Found");
      }

      const response = await this._getAppointment.execute(
        doctorId,
        appointmentId as string
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

  startConsultation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { appointmentId } = req.params;

      const doctorId = req.user?.id;
      if (!doctorId) {
        throw new UnauthorizedError("Doctor Id Not Found");
      }

      const response = await this._startConsultation.execute(
        doctorId,
        appointmentId as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "DOCTOR CONSULTATION STARTED SUCCESFFULy")
      );
    } catch (error) {
      next(error);
    }
  };
  skipAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { appointmentId } = req.params;

      const doctorId = req.user?.id;
      if (!doctorId) {
        throw new UnauthorizedError("Doctor Id Not Found");
      }

      const response = await this._skipAppointment.execute(
        doctorId,
        appointmentId as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "DOCTOR CONSULTATION SKIPPED SUCCESFFULy")
      );
    } catch (error) {
      next(error);
    }
  };
}
