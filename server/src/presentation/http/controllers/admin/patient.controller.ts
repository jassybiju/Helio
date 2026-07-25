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
import type { IToggleBlockPatientUseCase } from "@application/ports/use-cases/admin/patient/IToggleBlockPatientUseCase.ts";
import type { IGetPatientUseCase } from "@application/ports/use-cases/admin/patient/IGetPatientUseCase.ts";
import { GetPatientMapper } from "@application/use-cases/admin/patient/getPatient/GetPatientMapper.ts";

export class AdminPatientController {
  constructor(
    private readonly _getAllPatientUsecase: IGetAllPatientsUseCase,
    private readonly _getPatientUseCase: IGetPatientUseCase,
    private readonly _toggleBlockPatientUseCase: IToggleBlockPatientUseCase
  ) {}

  getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = getAllPatientsSchema.safeParse(req.query);
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

  getPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.patientId as string;
      if (!id) {
        throw new AppError(
          "Doctor Id Required",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._getPatientUseCase.execute(id);
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, MESSAGE.PATIENT_FETCH_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };

  toggleBlock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new AppError("Invalid UserId", HTTPStatus.UNPROCESSBLE_ENTITY);
      }

      const response = await this._toggleBlockPatientUseCase.execute(
        userId as string
      );

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
