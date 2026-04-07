import { patientCompleteProfileSchema } from "../../schemas/patient/profile.schema.ts";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { ICompletePatientProfileUseCase } from "@application/ports/use-cases/patient/profile/ICompletePatientProfileUseCase.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";

export class PatientProfileController {
  constructor(
    private readonly _completeProfile: ICompletePatientProfileUseCase
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
}
