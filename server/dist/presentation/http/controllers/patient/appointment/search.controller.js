import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { AppError } from "#shared/errors/AppError.js";
import { patientSearchDoctorSchema } from "../../../schemas/patient/doctor-search.schema.js";
// (optional) create a zod schema later if you want strict validation
export class PatientDoctorController {
    _searchDoctorUseCase;
    _getSlotUseCase;
    constructor(_searchDoctorUseCase, _getSlotUseCase) {
        this._searchDoctorUseCase = _searchDoctorUseCase;
        this._getSlotUseCase = _getSlotUseCase;
    }
    searchDoctor = async (req, res, next) => {
        try {
            const parsed = patientSearchDoctorSchema.safeParse(req.query);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const data = parsed.data;
            const input = {
                name: data.name,
                specialization: data.specialization,
                location: data.location,
                consultationType: data.consultationType,
                minFee: data.minFee,
                maxFee: data.maxFee,
                experienceYears: data.experienceYears,
                date: data.date,
                page: data.page ?? 1,
                limit: data.limit ?? 10,
            };
            const response = await this._searchDoctorUseCase.execute(input);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Doctors fetched successfully"));
        }
        catch (error) {
            next(error);
        }
    };
    getDoctorSlots = async (req, res, next) => {
        try {
            const doctorId = req.params.doctorId;
            const patientId = req.user?.id;
            const page = req.query.page;
            const limit = req.query.limit;
            const response = await this._getSlotUseCase.execute(doctorId, patientId, {
                page: Number(page),
                limit: Number(limit),
            });
            return apiResponse(res, HTTPStatus.OK, successResponse({
                slots: response.slots,
                doctor: response.doctor,
                reviews: response.reviews,
                totalCount: response.totalReviews,
            }, "Slots got successfully"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=search.controller.js.map