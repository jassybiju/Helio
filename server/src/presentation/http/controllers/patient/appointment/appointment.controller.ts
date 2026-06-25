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
import type {
  APPOINTMENT_STATUS,
  PAYMENT_TYPE,
} from "@domain/common/enums/appointment.enum.ts";
import type { IGetAllAppointmentsUseCase } from "@application/ports/use-cases/patient/appointments/IGetAllAppointmentsUsecase.ts";
import type { IVerifyAppointmentPaymentUseCase } from "@application/ports/use-cases/patient/appointments/IVerifyAppointmentPaymentUseCase.ts";
import type { IGetPatientLiveQueueUseCase } from "@application/ports/use-cases/patient/appointments/IGetPatientLiveQueueUseCase.ts";
import type { IGetRescheduledSlotsUseCase } from "@application/ports/use-cases/patient/appointments/cancellation/IGetRescheduledSlotsUseCase.ts";
import type { IRespondPatientResheduleAppointmentUseCase } from "@application/ports/use-cases/patient/appointments/cancellation/IRespondPatientResheduleAppointmentUseCase.ts";
import type { IRespondPatientCancelAndRefundAppointment } from "@application/ports/use-cases/patient/appointments/cancellation/IRespondPatientCancelAndRefundAppointment.ts";
import type { IPatientCancellationUseCase } from "@application/ports/use-cases/patient/appointments/cancellation/IPatientCancellationUseCase.ts";
import type { IPatientRescheduleUseCase } from "@application/ports/use-cases/patient/appointments/cancellation/IPatientRescheduleUseCase.ts";

export class PatientAppointmentController {
  constructor(
    private readonly _createAppointment: ICreateAppointmentUseCase,
    private readonly _getAppointment: IGetAppointmentUseCase,
    private readonly _checkout: ICheckoutAppointmentUseCase,
    private readonly _getAllAppointment: IGetAllAppointmentsUseCase,
    private readonly _liveQueue: IGetPatientLiveQueueUseCase,
    private readonly _verifyPayment: IVerifyAppointmentPaymentUseCase,
    private readonly _getRescheduleSlots: IGetRescheduledSlotsUseCase,
    private readonly _rescheduleAppointment: IRespondPatientResheduleAppointmentUseCase,
    private readonly _cancelAndRefundAppointment: IRespondPatientCancelAndRefundAppointment,
    private readonly _patientCancelAppointment: IPatientCancellationUseCase,
    private readonly _patientRescheduleAppointment: IPatientRescheduleUseCase
  ) {}

  patientRescheduleAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { appointmentId } = req.params;
      const patientId = req.user?.id as string;
      const data = req.body;
      const response = await this._patientRescheduleAppointment.execute(
        patientId,
        appointmentId as string,
        data
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "APPOINTMENT RESCHEUDULED SUCCESS")
      );
    } catch (error) {
      next(error);
    }
  };

  patientCancelAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { appointmentId } = req.params;
      const patientId = req.user?.id as string;
      const response = await this._patientCancelAppointment.execute(
        patientId,
        appointmentId as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "APPOINTMENT CANCELLED SUCCESS")
      );
    } catch (error) {
      next(error);
    }
  };

  cancelAndRefundAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { appointmentId } = req.params;
      const patientId = req.user?.id as string;
      const response = await this._cancelAndRefundAppointment.execute(
        patientId,
        appointmentId as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "APPOINTMENT CANCELLED SUCCESS")
      );
    } catch (error) {
      next(error);
    }
  };
  rescheduleAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { appointmentId } = req.params;
      const patientId = req.user?.id as string;
      const data = req.body;
      const response = await this._rescheduleAppointment.execute(
        patientId,
        appointmentId as string,
        data
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "APPOINTMENT RESCHEUDULED SUCCESS")
      );
    } catch (error) {
      next(error);
    }
  };

  getRescheduleSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { appointmentId } = req.params;
      const patientId = req.user?.id as string;

      const response = await this._getRescheduleSlots.execute(
        patientId,
        appointmentId as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "GET RESCHEDULE SLOTS")
      );
    } catch (error) {
      next(error);
    }
  };
  liveQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { appointmentId } = req.params;

      const patientId = req.user?.id as string;

      const response = await this._liveQueue.execute(
        appointmentId as string,
        patientId
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "LIVE QUEUE GOT SUCCESFFUlly")
      );
    } catch (error) {
      next(error);
    }
  };

  verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { appointmentId } = req.params;
      const patientId = req.user?.id as string;
      const body = req.body;
      const response = await this._verifyPayment.execute({
        appointmentId: appointmentId as string,
        patientId: patientId,

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

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = req.user?.id as string;
      const query = req.query as unknown;
      const response = await this._getAllAppointment.execute(
        patientId,
        query as { page: number; limit: number; status: APPOINTMENT_STATUS }
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Doctors fetched successfully")
      );
    } catch (error) {
      next(error);
    }
  };

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
