import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ICompleteDoctorProfileUseCase } from "@application/ports/use-cases/doctor/auth/ICompleteDoctorProfileUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import { doctorCompleteProfileSchema } from "../../schemas/doctor/profile.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";

export class DoctorProfileController {
  constructor(
    private readonly _completeProfile: ICompleteDoctorProfileUseCase
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
}
