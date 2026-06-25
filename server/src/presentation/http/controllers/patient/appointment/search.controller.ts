import type { Request, Response, NextFunction } from "express";
import type { ISearchDoctorUseCase } from "@application/ports/use-cases/patient/appointments/ISearchDoctorUseCase.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import {
  apiResponse,
  successResponse,
} from "@shared/utils/apiReponse.utils.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { patientSearchDoctorSchema } from "../../../schemas/patient/doctor-search.schema.ts";
import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import type { IGetSlotUseCase } from "@application/ports/use-cases/patient/appointments/IGetSlotUseCase.ts";

// (optional) create a zod schema later if you want strict validation

export class PatientDoctorController {
  constructor(
    private readonly _searchDoctorUseCase: ISearchDoctorUseCase,
    private readonly _getSlotUseCase: IGetSlotUseCase
  ) {}

  searchDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = patientSearchDoctorSchema.safeParse(req.query);

      if (!parsed.success) {
        throw new AppError(
          parsed.error.issues[0]?.message || "Validation Error",
          HTTPStatus.UNPROCESSBLE_ENTITY
        );
      }
      const data = parsed.data;

      const input = {
        name: data.name,
        specialization: data.specialization,

        location: data.location,
        consultationType: data.consultationType as CONSULTATION_TYPE,

        minFee: data.minFee,
        maxFee: data.maxFee,

        experienceYears: data.experienceYears,

        date: data.date,

        page: data.page ?? 1,
        limit: data.limit ?? 10,
      };

      const response = await this._searchDoctorUseCase.execute(input);

      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(response, "Doctors fetched successfully")
      );
    } catch (error) {
      next(error);
    }
  };

  getDoctorSlots = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctorId = req.params.doctorId! as string;
      const patientId = req.user?.id as string;
      const page = req.query.page! as string
      const limit = req.query.limit! as string

      const response = await this._getSlotUseCase.execute(doctorId, patientId,{page : Number(page), limit: Number(limit)});
      const doctor = response.doctor;
      return apiResponse(
        res,
        HTTPStatus.OK,
        successResponse(
          {
            slots: response.slots,
            doctor: {
              fullName: doctor.fullName,
              speciality: doctor.specialization,
              onlineFee: doctor.onlineFee,
              clinicFee: doctor.clinicFee,
              yearsOfExperience: doctor.yearsOfExperience,
              doctorId: doctor.id,
            },
            reviews: response.reviews,
            totalCount : response.totalReviews
          },
          "Slots got successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };
}
