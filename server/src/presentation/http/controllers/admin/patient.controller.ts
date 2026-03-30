import type { IGetAllPatientsUseCase } from "@application/ports/use-cases/admin/patient/IGetAllPatientsUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import { getAllPatientsSchema } from "../../schemas/admin/patient.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";

export class AdminPatientController {
  constructor(private readonly _getAllPatientUsecase: IGetAllPatientsUseCase) {}

  getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query);
      const parsed = getAllPatientsSchema.safeParse(req.query);
      console.log(parsed, req.query);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._getAllPatientUsecase.execute(parsed.data);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, MESSAGE.PATIENT_FETCH_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };
}
