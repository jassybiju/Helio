import type { IRegisterDoctorRequestDTO } from "@application/dto/doctor/auth/IRegisterDoctorDTO.ts";
import type { IRegisterDoctorUseCase } from "@application/ports/use-cases/doctor/auth/IRegisterDoctorUseCase.ts";
import type { NextFunction, Request, Response } from "express";
import { doctorRegisterSchema } from "../../schemas/doctor/auth.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";

export class DoctorAuthController {
  constructor(
    private readonly _registerDoctorUseCase: IRegisterDoctorUseCase,
    private readonly _logger: ILogger
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const parsed = doctorRegisterSchema.safeParse(req.body);

      if (!parsed.success) {
        this._logger.error("Zod Validation erorr", parsed.error);
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      if (!req.file || !req.file.buffer) {
        throw new AppError(
          "Document Required for registration",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }

      const result = await this._registerDoctorUseCase.execute({
        ...parsed.data,
        document: req.file,
      });
    } catch (error) {
      next(error);
    }
  };
}
