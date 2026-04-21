import type {
  IDoctorScheduleInput,
  ISetDoctorScheduleUseCase,
} from "@application/ports/use-cases/doctor/schedule/ISetDoctorScheduleUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import { setDoctorScheduleSchema } from "../../schemas/doctor/schedule.schema.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { IGetDoctorScheduleUseCase } from "@application/ports/use-cases/doctor/schedule/IGetDoctorScheduleUseCase.ts";
import { GetDoctorScheduleMapper } from "@application/use-cases/doctor/schedule/getDoctorSchedule/GetDoctorScheduleMapper.tsx";
import type { IDeleteDoctorScheduleUseCase } from "@application/ports/use-cases/doctor/schedule/IDeleteDoctorScheduleUseCase.ts";

export class DoctorScheduleController {
  constructor(
    private readonly _setSchedule: ISetDoctorScheduleUseCase,
    private readonly _getSchedule: IGetDoctorScheduleUseCase,
    private readonly _deleteSchedule: IDeleteDoctorScheduleUseCase
  ) {}

  setSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }
      const parsed = setDoctorScheduleSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      await this._setSchedule.execute(
        doctorId,
        parsed.data as IDoctorScheduleInput
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, MESSAGE.DOCTOR_SCHEDULE_CREATED)
      );
    } catch (error) {
      next(error);
    }
  };

  getSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      const shifts = await this._getSchedule.execute(doctorId);
      const response = GetDoctorScheduleMapper.toDto(shifts);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, MESSAGE.DOCTOR_SCHEDULE_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      const shiftId = req.params.shiftId;

      if (!doctorId || !shiftId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      await this._deleteSchedule.execute(shiftId as string, doctorId);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, MESSAGE.DOCTOR_SCHEDULE_DELETED)
      );
    } catch (error) {
      next(error);
    }
  };
}
