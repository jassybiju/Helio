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
import type { IGetDoctorUseCase } from "@application/ports/use-cases/admin/doctor/IGetDoctorUseCase.ts";
import { GetDoctorMapper } from "@application/use-cases/admin/doctor/getDoctor/GetDoctorMapper.ts";
import type { IToggleBlockDoctorUseCase } from "@application/ports/use-cases/admin/doctor/IToggleBlockDoctorUseCase.ts";
import type { IChangeDoctorApprovalStatusRequestDTO } from "@application/use-cases/admin/doctor/changeDoctorApprovalStatus/IChangeDoctorApprovalStatusDTO.ts";

export class AdminDoctorController {
  constructor(
    private readonly _getAllDoctorUseCase: IGetAllDoctorsUseCase,
    private readonly _getDoctorUseCase: IGetDoctorUseCase,
    private readonly _changeDoctorApprovalStatusUseCase: IChangeDoctorApprovalStatusUseCase,
    private readonly _toggleBlockDoctorUseCase: IToggleBlockDoctorUseCase
  ) {}

  getDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.doctorId as string;
      if (!id) {
        throw new AppError(
          "Doctor Id Required",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const {
        doctor,
        verificationHistory,
        documentUrl,
        totalAppointments,
        appointmentStatusDistribution,
      } = await this._getDoctorUseCase.execute(id);

      const response = GetDoctorMapper.toDto(
        doctor,
        documentUrl,
        verificationHistory,
        totalAppointments,
        appointmentStatusDistribution
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Doctor Found")
      );
    } catch (error) {
      next(error);
    }
  };

  getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = getAllDoctorSchema.safeParse(req.query);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const { doctors, page, limit, totalCount } =
        await this._getAllDoctorUseCase.execute(parsed.data);

      const response = {
        doctors,
        limit,
        page,
        totalCount,
      };

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
        parsed.data as IChangeDoctorApprovalStatusRequestDTO,
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

  toggleBlock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { doctorId } = req.params;
      if (!doctorId) {
        throw new AppError("Invalid UserId", HTTPStatus.UNPROCESSBLE_ENTITY);
      }

      const response = await this._toggleBlockDoctorUseCase.execute(
        doctorId as string
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
