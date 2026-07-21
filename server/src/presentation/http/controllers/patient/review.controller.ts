import type { IAddReview } from "@application/ports/use-cases/patient/review/IAddReview.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";

export class PatientReviewController {
  constructor(private readonly _addReview: IAddReview) {}

  addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientId = req.user?.id;

      if (!patientId) {
        throw new AppError("Patient Id Requried", HTTPStatus.INTERNAL_ERROR);
      }
      const doctorId = req.params.doctorId;
      const body = req.body;

      const response = await this._addReview.execute(
        patientId,
        doctorId as string,
        body
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Review Added")
      );
    } catch (error) {
      next(error);
    }
  };
}
