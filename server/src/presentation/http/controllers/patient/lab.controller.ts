import type { IGetPatientLabReportUseCase } from "@application/ports/use-cases/patient/appointments/IGetPatientLabReportUseCase.ts";
import type { IUploadPatientLabReportUseCase } from "@application/ports/use-cases/patient/appointments/IUploadPatientLabReportUseCase.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class PatientLabReportController {
  constructor(
    private readonly _getLabReport: IGetPatientLabReportUseCase,
    private readonly _uploadLabReport: IUploadPatientLabReportUseCase
  ) {}

  getLabReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = req.user?.id as string;

      const query = req.query as unknown;
      const response = await this._getLabReport.execute(
        patientId,
        query as { page: number; limit: number }
      );
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Lab report got succesfully")
      );
    } catch (error) {
      next(error);
    }
  };
  uploadReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = req.user?.id as string;
      const { reportId } = req.params;
      console.log(req.query);
      const response = await this._uploadLabReport.execute(
        patientId,
        reportId as string,
        req.file!
      );
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Lab report Uploaded succesfully")
      );
    } catch (error) {
      next(error);
    }
  };
}
