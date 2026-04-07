import { patientCompleteProfileSchema } from "../../schemas/patient/profile.schema.ts";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { ICompletePatientProfileUseCase } from "@application/ports/use-cases/patient/profile/ICompletePatientProfileUseCase.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import type { IGetPatientProfile } from "@application/ports/use-cases/patient/profile/IGetPatientProfileUseCase.tsx";
import { GetPatientProfile } from "@application/use-cases/patient/profile/getPatientProfile/GetPatientProfile.tsx";
import { GetPatientProfileMapper } from "@application/use-cases/patient/profile/getPatientProfile/GetPatientMapper.tsx";

export class PatientProfileController {
  constructor(
    private readonly _completeProfile: ICompletePatientProfileUseCase,
    private readonly _getPatientProfile: IGetPatientProfile
  ) {}

  completeProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientCompleteProfileSchema.safeParse(req.body);
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
      });

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Patient Profile Completed")
      );
    } catch (error) {
      next(error);
    }
  };
  getPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;

      if (!userId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      const patient = await this._getPatientProfile.execute(userId);

      const response = GetPatientProfileMapper.toDto(patient);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, MESSAGE.PATIENT_PROFILE_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };
}
