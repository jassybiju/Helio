import type { IAddLabReportUseCase } from "#application/ports/use-cases/doctor/consultation/IAddLabReportUseCase.js";
import type { IAddPrescriptionUseCase } from "#application/ports/use-cases/doctor/consultation/IAddPrescriptionUseCase.js";
import type { IDoctorEndConsultationUseCase } from "#application/ports/use-cases/doctor/consultation/IDoctorEndConsultationUseCase.js";
import type { IDoctorViewConsultationUseCase } from "#application/ports/use-cases/doctor/consultation/IDoctorViewConsultationUseCase.js";
import type { IRemoveLabReportUseCase } from "#application/ports/use-cases/doctor/consultation/IRemoveLabReportUseCase.js";
import type { IRemovePrescriptionUseCase } from "#application/ports/use-cases/doctor/consultation/IRemovePrescriptionUseCase.js";
import type { IUpdateConsultationNotesUseCase } from "#application/ports/use-cases/doctor/consultation/IUpdateConsultationNotesUseCase.js";
import type { IUpdateVitalsConsultationUseCase } from "#application/ports/use-cases/doctor/consultation/IUpdateVitalsConsultationUseCase.js";
import type { IViewHistoryUseCase } from "#application/ports/use-cases/doctor/consultation/IViewHistoryUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import {
  apiResponse,
  successResponse,
} from "#shared/utils/apiReponse.utils.js";
import type { NextFunction, Request, Response } from "express";

export class ConsultationController {
  constructor(
    private readonly _endConsultation: IDoctorEndConsultationUseCase,
    private readonly _viewConsultation: IDoctorViewConsultationUseCase,
    private readonly _updateVitals: IUpdateVitalsConsultationUseCase,
    private readonly _addPrescription: IAddPrescriptionUseCase,
    private readonly _removePrescription: IRemovePrescriptionUseCase,
    private readonly _updateNotes: IUpdateConsultationNotesUseCase,
    private readonly _addTest: IAddLabReportUseCase,
    private readonly _removeTest: IRemoveLabReportUseCase,
    private readonly _viewHistory: IViewHistoryUseCase
  ) {}

  updateNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId } = req.params;
      const data = req.body;
      const response = await this._updateNotes.execute(
        doctorId,
        appointmentId as string,
        data
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Consultation notes updated Success")
      );
    } catch (error) {
      next(error);
    }
  };

  viewConsultation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const doctorId = req.user?.id;
      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId } = req.params;
      const response = await this._viewConsultation.execute(
        doctorId,
        appointmentId as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "View Consultation Success")
      );
    } catch (error) {
      next(error);
    }
  };

  endConsultation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId } = req.params;
      const response = await this._endConsultation.execute(
        doctorId,
        appointmentId as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Consultation ended Success")
      );
    } catch (error) {
      next(error);
    }
  };

  updateVitals = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId } = req.params;
      const response = await this._updateVitals.execute(
        doctorId,
        appointmentId as string,
        req.body
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Consultation Vitals Updated Success")
      );
    } catch (error) {
      next(error);
    }
  };

  addPrescription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId } = req.params;
      const response = await this._addPrescription.execute(
        doctorId,
        appointmentId as string,
        req.body
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Consultation Prescription Added Success")
      );
    } catch (error) {
      next(error);
    }
  };

  removePrescription = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId, prescriptionName } = req.params;
      const response = await this._removePrescription.execute(
        doctorId,
        appointmentId as string,
        prescriptionName as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Consultation Prescription Removed Success")
      );
    } catch (error) {
      next(error);
    }
  };

  addTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId } = req.params;
      const response = await this._addTest.execute(
        doctorId,
        appointmentId as string,
        req.body
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Consultation Prescription Added Success")
      );
    } catch (error) {
      next(error);
    }
  };

  removeTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId, testId } = req.params;
      const response = await this._removeTest.execute(
        doctorId,
        appointmentId as string,
        testId as string
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Lab Report Removed Success")
      );
    } catch (error) {
      next(error);
    }
  };

  viewHistory = async (
    req: Request<
      { appointmentId: string },
      unknown,
      unknown,
      { page?: string; limit?: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const doctorId = req.user?.id;
      const { page, limit } = req.query;
      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId } = req.params;
      const response = await this._viewHistory.execute(
        doctorId,
        appointmentId as string,
        Number(page),
        Number(limit)
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Lab Report Removed Success")
      );
    } catch (error) {
      next(error);
    }
  };
}
