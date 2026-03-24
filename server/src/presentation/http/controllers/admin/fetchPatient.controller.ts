import type { IFetchByStartingCharacterUseCase } from "@application/ports/use-cases/admin/IFetchByStartingCharacterUseCase.ts";
import type { NextFunction, Request } from "express";
import { fetchPatientSchema } from "../../schemas/admin/fetchPatient.schema.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class FetchPatientController {
  constructor(
    private readonly _fetchPatientByStartingChar: IFetchByStartingCharacterUseCase
  ) {}

  fetchPatientByStartingChar = async (
    req: Request,
    res: Resoonse,
    next: NextFunction
  ) => {
    try {
      const parsed = fetchPatientSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError("Validation Erorr", HTTPStatus.UNPROCESSBLE_ENTITY);
      }

      const result = await this._fetchPatientByStartingChar.execute(
        parsed.data
      );

      return res.status(HTTPStatus.OK).json({ result });
    } catch (error) {
      next(error);
    }
  };
}
