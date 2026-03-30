import type { IGetAllDoctorsUseCase } from "@application/ports/use-cases/admin/doctor/IGetAllDoctorsUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import { getAllDoctorSchema } from "../../schemas/admin/admin.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";

export class AdminDoctorController {
  constructor(private readonly _getAllDoctorUseCase: IGetAllDoctorsUseCase) {}

  getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = getAllDoctorSchema.safeParse(req.query);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._getAllDoctorUseCase.execute(parsed.data);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, MESSAGE.DOCTOR_FETCH_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };
}
