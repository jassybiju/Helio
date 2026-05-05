import type { ICreateSpecialtyUseCase } from "@application/ports/use-cases/ICreateSpecialtyUseCase.ts";
import type { IGetSpecialityUsecase } from "@application/ports/use-cases/IGetSpecialityUsecase.ts";
import type { IRemoveSpecialtyUseCase } from "@application/ports/use-cases/IRemoveSpecialtyUseCase.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import { type NextFunction, type Request, type Response } from "express";
import { success } from "zod";

export class SpecialtyController {
  constructor(
    private readonly _getSpecialtiesUseCase: IGetSpecialityUsecase,
    private readonly _createSpecialtyUseCase: ICreateSpecialtyUseCase,
    private readonly _removeSpecialtyUseCase: IRemoveSpecialtyUseCase
  ) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._getSpecialtiesUseCase.execute();
      res.json({
        message: "Specialties fetched",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  addSpecialty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description } = req.body;

      if (!name || typeof name !== "string") {
        throw new Error("Specialty name is required");
      }

      const result = await this._createSpecialtyUseCase.execute({
        name,
        description,
      });
      return apiResponse(
        res,
        HTTPStatus.CREATED,
        successResponse(result, "Specialty created successfully")
      );
    } catch (error) {
      next(error);
    }
  };

  removeSpecialty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("Specialty ID is required");
      }

      await this._removeSpecialtyUseCase.execute(id as string);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, "Specialty deleted succesflly")
      );
    } catch (error) {
      next(error);
    }
  };
}
