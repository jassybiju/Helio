import type {
  IRegisterPatientRequestDTO,
  IRegisterPatientResponseDTO,
} from "@application/dto/patient/auth/IRegisterPatientDTO.ts";
import type { NextFunction, Request, Response } from "express";
import { patientRegisterSchema } from "../../schemas/patient/auth.schema.ts";
import type { IRegisterPatientUseCase } from "@application/ports/use-cases/patient/auth/IRegisterPatientUseCase.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { successResponse } from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { parse } from "zod";
import { AppError } from "@shared/errors/AppError.ts";

export class PatientAuthController {
  constructor(
    private readonly _registerPatientUseCase: IRegisterPatientUseCase
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientRegisterSchema.safeParse(req.body);
      if (!parsed.success) {
        console.log(parsed.error.issues[0]?.message, 123);
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const response = await this._registerPatientUseCase.execute(parsed.data);
      return res
        .status(HTTPStatus.CREATED)
        .json(
          successResponse<IRegisterPatientResponseDTO>(
            response,
            MESSAGE.OTP_SENT
          )
        );
    } catch (error) {
      next(error);
    }
  };
}
