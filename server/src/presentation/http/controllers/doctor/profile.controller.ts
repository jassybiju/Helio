import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ICompleteDoctorProfileUseCase } from "@application/ports/use-cases/doctor/auth/ICompleteDoctorProfileUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import {
  doctorCompleteProfileSchema,
  doctorUpdateFeeSchema,
} from "../../schemas/doctor/profile.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import type { IGetDoctorProfileUseCase } from "@application/ports/use-cases/doctor/profile/IGetDoctorProfileUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { GetDoctorProfileMapper } from "@application/use-cases/doctor/profile/getDoctorProfile/GetDoctorProfileMapper.ts";
import type { IUpdateDoctorFeeUseCase } from "@application/ports/use-cases/doctor/profile/IUpdateDoctorFeeUseCase.ts";

export class DoctorProfileController {
  constructor(
    private readonly _completeProfile: ICompleteDoctorProfileUseCase,
    private readonly _getDoctorProfile: IGetDoctorProfileUseCase,
    private readonly _updateDoctorFee: IUpdateDoctorFeeUseCase
  ) {}

  completeProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = doctorCompleteProfileSchema.safeParse(req.body);
      const userId = req.user!.id;
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }
      console.log(req.file);
      const response = await this._completeProfile.execute(userId, {
        ...parsed.data,
        document: req.file!,
      });

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Doctor Profile Completed")
      );
    } catch (error) {
      next(error);
    }
  };

  getDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      const doctor = await this._getDoctorProfile.execute(userId);
      const response = GetDoctorProfileMapper.toDto(doctor);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, MESSAGE.DOCTOR_PROFILE_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };

  updateDoctorFee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }
      const parsed = doctorUpdateFeeSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      await this._updateDoctorFee.execute(
        doctorId,
        parsed.data.onlineFee,
        parsed.data.clinicFee
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, MESSAGE.DOCTOR_FEE_UPDATED)
      );
    } catch (error) {
      next(error);
    }
  };
}
