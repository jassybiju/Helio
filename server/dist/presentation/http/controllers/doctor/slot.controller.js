import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { apiResponse, errorResponse, successResponse, } from "#shared/utils/apiReponse.utils.js";
import { blockDoctorSlotSchema, getAllDoctorSlotsSchema, } from "../../schemas/doctor/slot.schema.js";
import { GetDoctorWeeklySlotsMapper } from "#application/use-cases/doctor/slot/getDoctorSlots/GetDoctorWeeklySlotsMapper.js";
import { GetDoctorBlockSlotMapper } from "#application/use-cases/doctor/slot/getDoctorBlockSlot/GetDoctorBlockSlotMapper.js";
export class DoctorSlotController {
    _getSlots;
    _blockSlot;
    _getBlockSlot;
    _deleteblockSlot;
    constructor(_getSlots, _blockSlot, _getBlockSlot, _deleteblockSlot) {
        this._getSlots = _getSlots;
        this._blockSlot = _blockSlot;
        this._getBlockSlot = _getBlockSlot;
        this._deleteblockSlot = _deleteblockSlot;
    }
    deleteBlock = async (req, res, next) => {
        try {
            const doctorId = req?.user?.id;
            if (!doctorId) {
                throw new AppError("Doctor Id required", HTTPStatus.UNAUTHORIZED);
            }
            const { blockId } = req.params;
            const response = await this._deleteblockSlot.execute(doctorId, blockId);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Block Deleted Successfully"));
        }
        catch (error) {
            next(error);
        }
    };
    getSlots = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new AppError(MESSAGE.INTERNAL_ERROR, HTTPStatus.INTERNAL_ERROR);
            }
            const parsed = getAllDoctorSlotsSchema.safeParse(req.query);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const { sort, limit, page, order } = parsed.data;
            const filters = {
                page: Number(page) || 1,
                limit: Number(limit) || 10,
                sort: sort === "day" || sort === "time" ? sort : "day",
                order: order === "asc" || order === "desc" ? order : "asc",
            };
            const response = await this._getSlots.execute(doctorId, filters);
            const slots = GetDoctorWeeklySlotsMapper.toDto(response);
            return apiResponse(res, HTTPStatus.OK, successResponse({ slots }, MESSAGE.DOC_SLOT_GET));
        }
        catch (error) {
            next(error);
        }
    };
    blockSlots = async (req, res, next) => {
        try {
            const doctorId = req?.user?.id;
            if (!doctorId) {
                throw new AppError("Doctor Id required", HTTPStatus.UNAUTHORIZED);
            }
            const parsed = blockDoctorSlotSchema.safeParse(req.body);
            if (!parsed.success) {
                throw new AppError(parsed.error.issues[0]?.message || "Validation Error", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const response = await this._blockSlot.execute(doctorId, parsed.data);
            if (!response.blocked) {
                return apiResponse(res, HTTPStatus.CONFLICT, errorResponse("Block Failed", response));
            }
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Blocked Successfully"));
        }
        catch (error) {
            next(error);
        }
    };
    getBlockSlot = async (req, res, next) => {
        try {
            const doctorId = req.user?.id;
            if (!doctorId) {
                throw new AppError("Doctor Id required", HTTPStatus.UNAUTHORIZED);
            }
            const blockShifts = await this._getBlockSlot.execute(doctorId);
            const response = GetDoctorBlockSlotMapper.toDto(blockShifts);
            return apiResponse(res, HTTPStatus.OK, successResponse(response, "Got Blocked Slots"));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=slot.controller.js.map