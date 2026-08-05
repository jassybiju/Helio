import type { ICreateSpecialtyUseCase } from "#application/ports/use-cases/ICreateSpecialtyUseCase.js";
import type { IGetAllSpecialityUseCase } from "#application/ports/use-cases/IGetAllSpecialityUseCase.js";
import type { IGetSpecialityUsecase } from "#application/ports/use-cases/IGetSpecialityUsecase.js";
import type { IRemoveSpecialtyUseCase } from "#application/ports/use-cases/IRemoveSpecialtyUseCase.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import {
  apiResponse,
  successResponse,
} from "#shared/utils/apiReponse.utils.js";
import { type NextFunction, type Request, type Response } from "express";

export class SpecialtyController {
  constructor(
    private readonly _getSpecialtiesUseCase: IGetSpecialityUsecase,
    private readonly _createSpecialtyUseCase: ICreateSpecialtyUseCase,
    private readonly _removeSpecialtyUseCase: IRemoveSpecialtyUseCase,
    private readonly _getAllSpecialtyUseCase: IGetAllSpecialityUseCase
  ) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._getAllSpecialtyUseCase.execute();
      res.json({
        message: "Specialties fetched",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown;
      const data = await this._getSpecialtiesUseCase.execute(
        query as { page: number; limit: number }
      );
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
