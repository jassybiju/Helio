import {
  patientCompleteProfileSchema,
  updatePatientSchema,
} from "../../schemas/patient/profile.schema.js";
import { type NextFunction, type Request, type Response } from "express";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type { ICompletePatientProfileUseCase } from "#application/ports/use-cases/patient/profile/ICompletePatientProfileUseCase.js";
import {
  apiResponse,
  successResponse,
} from "#shared/utils/apiReponse.utils.js";
import { MESSAGE } from "#shared/constants/messages.js";
import type { IGetPatientProfileUseCase } from "#application/ports/use-cases/patient/profile/IGetPatientProfileUseCase.js";
import type { IAddPatientAllergenUseCase } from "#application/ports/use-cases/patient/profile/IAddPatientAllergenUseCase.js";
import type { ALLERGEN_SEVERITY } from "#domain/common/enums/allergen_severity.js";
import type { IRemovePatientAllergenUseCase } from "#application/ports/use-cases/patient/profile/IRemovePatientAllergenUseCase.js";
import type { IAddPatientConditionUseCase } from "#application/ports/use-cases/patient/profile/IAddPatientConditionUseCase.js";
import type { IRemovePatientConditionUseCase } from "#application/ports/use-cases/patient/profile/IRemovePatientConditionUseCase.js";
import type { IChangePatientPasswordUseCase } from "#application/ports/use-cases/patient/profile/IChangePatientPasswordUseCase.js";
import type { IUpdatePatientProfileUseCase } from "#application/ports/use-cases/patient/profile/IUpdatePatientProfileUseCase.js";
import type { IPatientUpdateProfilePictureUseCase } from "#application/ports/use-cases/patient/profile/IUpdateProfilePictureUseCase.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { ValidationError } from "#shared/errors/ValidationError.js";

export class PatientProfileController {
  constructor(
    private readonly _completeProfile: ICompletePatientProfileUseCase,
    private readonly _getPatientProfile: IGetPatientProfileUseCase,
    private readonly _addPatientAllergen: IAddPatientAllergenUseCase,
    private readonly _removePatientAllergen: IRemovePatientAllergenUseCase,
    private readonly _addPatientCondition: IAddPatientConditionUseCase,
    private readonly _removePatientCondition: IRemovePatientConditionUseCase,
    private readonly _changePassword: IChangePatientPasswordUseCase,
    private readonly _updatePatientProfile: IUpdatePatientProfileUseCase,
    private readonly _updatePatientProfilePic: IPatientUpdateProfilePictureUseCase
  ) {}

  updateProfilePic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
      }
      if (!req.file) {
        throw new ValidationError("FILE is required");
      }
      await this._updatePatientProfilePic.execute(userId, req.file!);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, "PROFILE PIC UPDATED")
      );
    } catch (error) {
      next(error);
    }
  };

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

      const response = await this._getPatientProfile.execute(userId);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, MESSAGE.PATIENT_PROFILE_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };

  addAllergen = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { allergen, severity } = req.body;
      if (!userId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      await this._addPatientAllergen.execute(
        userId,
        allergen,
        severity as ALLERGEN_SEVERITY
      );

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, MESSAGE.PATIENT_ADD_ALLERGEN_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };

  removeAllergen = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;

      const allergenId = req.params.allergenId as string;

      if (!userId || !allergenId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      await this._removePatientAllergen.execute(userId, allergenId);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, MESSAGE.PATIENT_REMOVE_ALLERGEN_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };

  addCondition = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;

      const { condition } = req.body;

      if (!userId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      await this._addPatientCondition.execute(userId, condition);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, MESSAGE.PATIENT_ADD_CONDITION_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };

  removeCondition = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;

      const conditionId = req.params.conditionId as string;

      if (!userId || !conditionId) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      await this._removePatientCondition.execute(userId, conditionId);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, MESSAGE.PATIENT_REMOVE_CONDITION_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;

      const { newPassword, oldPassword } = req.body;

      if (!userId || !newPassword || !oldPassword || newPassword.length < 4) {
        throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
      }

      await this._changePassword.execute(userId, oldPassword, newPassword);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(null, MESSAGE.PASSWORD_CHANGED_SUCCESFULY)
      );
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = updatePatientSchema.safeParse(req.body);

      const userId = req.user!.id;
      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }
      const response = await this._updatePatientProfile.execute({
        patientId: userId,
        ...parsed.data,
      });

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Patient Profile Updated Succesfully")
      );
    } catch (error) {
      next(error);
    }
  };
}
