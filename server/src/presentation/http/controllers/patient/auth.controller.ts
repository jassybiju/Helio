import type {
  IRegisterPatientRequestDTO,
  IRegisterPatientResponseDTO,
} from "@application/dto/patient/auth/IRegisterPatientDTO.ts";
import type { NextFunction, Request, Response } from "express";
import { patientRegisterSchema } from "../../schemas/patient/register.schema.ts";
import type { IRegisterPatientUseCase } from "@application/ports/use-cases/patient/auth/IRegisterPatientUseCase.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { successResponse } from "@shared/utils/apiReponse.utils.ts";
import { MESSAGE } from "@shared/constants/messages.ts";

export class PatientAuthController {
  constructor(
    private readonly _registerPatientUseCase: IRegisterPatientUseCase
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
   try {
     const result: IRegisterPatientRequestDTO = patientRegisterSchema.parse(
       req.body
     );
     const response = await this._registerPatientUseCase.execute(result);
     return res
       .status(HTTPStatus.CREATED)
       .json(
         successResponse<IRegisterPatientResponseDTO>(response, MESSAGE.OTP_SENT)
       );
   } catch (error) {
      next(error)
   }
  };
}
