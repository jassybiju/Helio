import type { IAddLabReportUseCase } from "@application/ports/use-cases/doctor/consultation/IAddLabReportUseCase.ts";
import type { IAddPrescriptionUseCase } from "@application/ports/use-cases/doctor/consultation/IAddPrescriptionUseCase.ts";
import type { IDoctorEndConsultationUseCase } from "@application/ports/use-cases/doctor/consultation/IDoctorEndConsultationUseCase.ts";
import type { IDoctorViewConsultationUseCase } from "@application/ports/use-cases/doctor/consultation/IDoctorViewConsultationUseCase.ts";
import type { IRemoveLabReportUseCase } from "@application/ports/use-cases/doctor/consultation/IRemoveLabReportUseCase.ts";
import type { IRemovePrescriptionUseCase } from "@application/ports/use-cases/doctor/consultation/IRemovePrescriptionUseCase.ts";
import type { IUpdateConsultationNotesUseCase } from "@application/ports/use-cases/doctor/consultation/IUpdateConsultationNotesUseCase.ts";
import type { IUpdateVitalsConsultationUseCase } from "@application/ports/use-cases/doctor/consultation/IUpdateVitalsConsultationUseCase.ts";
import type { IViewHistoryUseCase } from "@application/ports/use-cases/doctor/consultation/IViewHistoryUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
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

  viewHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const { appointmentId } = req.params;
      const response = await this._viewHistory.execute(
        doctorId,
        appointmentId as string
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
