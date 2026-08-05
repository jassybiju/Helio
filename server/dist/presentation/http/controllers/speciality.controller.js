import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
import {} from "express";
export class SpecialtyController {
    _getSpecialtiesUseCase;
    _createSpecialtyUseCase;
    _removeSpecialtyUseCase;
    _getAllSpecialtyUseCase;
    constructor(_getSpecialtiesUseCase, _createSpecialtyUseCase, _removeSpecialtyUseCase, _getAllSpecialtyUseCase) {
        this._getSpecialtiesUseCase = _getSpecialtiesUseCase;
        this._createSpecialtyUseCase = _createSpecialtyUseCase;
        this._removeSpecialtyUseCase = _removeSpecialtyUseCase;
        this._getAllSpecialtyUseCase = _getAllSpecialtyUseCase;
    }
    getAll = async (req, res, next) => {
        try {
            const data = await this._getAllSpecialtyUseCase.execute();
            res.json({
                message: "Specialties fetched",
                data,
            });
        }
        catch (error) {
            next(error);
        }
    };
    get = async (req, res, next) => {
        try {
            const query = req.query;
            const data = await this._getSpecialtiesUseCase.execute(query);
            res.json({
                message: "Specialties fetched",
                data,
            });
        }
        catch (error) {
            next(error);
        }
    };
    addSpecialty = async (req, res, next) => {
        try {
            const { name, description } = req.body;
            if (!name || typeof name !== "string") {
                throw new Error("Specialty name is required");
            }
            const result = await this._createSpecialtyUseCase.execute({
                name,
                description,
            });
            return apiResponse(res, HTTPStatus.CREATED, successResponse(result, "Specialty created successfully"));
        }
        catch (error) {
            next(error);
        }
    };
    removeSpecialty = async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Specialty ID is required");
            }
            await this._removeSpecialtyUseCase.execute(id);
            return apiResponse(res, HTTPStatus.OK, successResponse(null, "Specialty deleted succesflly"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=speciality.controller.js.map