import type { IGetAllDoctorsUseCase } from "@application/ports/use-cases/admin/doctor/IGetAllDoctorsUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import {
  changeDoctorApprovalStatusSchema,
  getAllDoctorSchema,
} from "../../schemas/admin/doctor.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import type { IChangeDoctorApprovalStatusUseCase } from "@application/ports/use-cases/admin/doctor/IChangeDoctorApprovalStatusUseCase.ts";

export class AdminDoctorController {
  constructor(
    private readonly _getAllDoctorUseCase: IGetAllDoctorsUseCase,
    private readonly _changeDoctorApprovalStatusUseCase: IChangeDoctorApprovalStatusUseCase
  ) {}

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
  changeDoctorApprovalStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const doctorId = req.params.doctorId as string;
      
      if (!doctorId) {
        throw new AppError(
          "Doctor Id is required",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }
      
      const parsed = changeDoctorApprovalStatusSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }
      const response = await this._changeDoctorApprovalStatusUseCase.execute(
        parsed.data,
        doctorId
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Doctor Approval status changed successfully")
      );
    } catch (error) {
      next(error);
    }
  };
}
