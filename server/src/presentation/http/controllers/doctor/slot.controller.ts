import type { IDoctorSlotFilters } from "@application/ports/repositories/IDoctorSlotRepository.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { NextFunction, Request, Response } from "express";
import {
  blockDoctorSlotSchema,
  getAllDoctorSlotsSchema,
} from "../../schemas/doctor/slot.schema.ts";
import { parse } from "zod";
import { GetDoctorWeeklySlotsMapper } from "@application/use-cases/doctor/slot/getDoctorSlots/GetDoctorWeeklySlotsMapper.ts";
import type { IGetDoctorWeeklySlotsUseCase } from "@application/ports/use-cases/doctor/slot/IGetDoctorWeeklySlotsUseCase.ts";
import type { IBlockDoctorSlotUseCase } from "@application/ports/use-cases/doctor/slot/IBlockDoctorSlotUseCase.ts";
import type { IGetDoctorBlockSlotUseCase } from "@application/ports/use-cases/doctor/slot/IGetDoctorBlockSlotUseCase.ts";
import { DoctorBlockShiftMapper } from "../../../../mappers/DoctorBlockShiftMapper.ts";
import { GetDoctorBlockSlotMapper } from "@application/use-cases/doctor/slot/getDoctorBlockSlot/GetDoctorBlockSlotMapper.ts";

export class DoctorSlotController {
  constructor(
    private readonly _getSlots: IGetDoctorWeeklySlotsUseCase,
    private readonly _blockSlot: IBlockDoctorSlotUseCase,
    private readonly _getBlockSlot: IGetDoctorBlockSlotUseCase
  ) {}

  getSlots = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;
      if (!doctorId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      const parsed = getAllDoctorSlotsSchema.safeParse(req.query);
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const { sort, limit, page, order } = parsed.data;

      const filters: IDoctorSlotFilters = {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sort: sort === "day" || sort === "time" ? sort : "day",
        order: order === "asc" || order === "desc" ? order : "asc",
      };

      const response = await this._getSlots.execute(doctorId, filters);
      const slots = GetDoctorWeeklySlotsMapper.toDto(response);
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse({ slots }, MESSAGE.DOC_SLOT_GET)
      );
    } catch (error) {
      next(error);
    }
  };

  blockSlots = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req?.user?.id;

      if (!doctorId) {
        throw new AppError("Doctor Id required", HTTPStatus.UNAUTHORIZED);
      }

      const parsed = blockDoctorSlotSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._blockSlot.execute(doctorId, parsed.data);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Blocked Successfully")
      );
    } catch (error) {
      next(error);
    }
  };

  getBlockSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new AppError("Doctor Id required", HTTPStatus.UNAUTHORIZED);
      }

      const blockShifts = await this._getBlockSlot.execute(doctorId);
      const response = GetDoctorBlockSlotMapper.toDto(blockShifts);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Got Blocked Slots")
      );
    } catch (error) {
      next(error);
    }
  };
}
