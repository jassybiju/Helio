import { BaseRepository } from "./BaseRepository.js";
import { DoctorShift } from "#domain/entities/DoctorShift.js";
import { doctorShiftModel, } from "../model/DoctorShiftModel.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { AppError } from "#shared/errors/AppError.js";
import { DoctorShiftMapper } from "../../../mappers/DoctorShiftMapper.js";
export class DoctorShiftRepository extends BaseRepository {
    _loggerService;
    constructor(_loggerService, session = null) {
        super(doctorShiftModel, session);
        this._loggerService = _loggerService;
    }
    withSession(session) {
        return new DoctorShiftRepository(this._loggerService, session);
    }
    async findById(id) {
        try {
            this._loggerService.info("Fetching shift by id ", { id });
            return await super.findById(id, DoctorShiftMapper.toDomain);
        }
        catch (error) {
            this._loggerService.error("Failed to fetch ", error);
            throw new AppError("Failed to Fetch Doctor Shifts", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async findByDoctor(doctorId) {
        try {
            this._loggerService.info("Fetching shift by doctorId", { doctorId });
            return await super.find({ doctor_id: doctorId }, { sort: { day_of_week: 1 } }, DoctorShiftMapper.toDomain);
        }
        catch (error) {
            this._loggerService.error("Failed to fetch ", error);
            throw new AppError("Failed to Fetch Doctor Shifts", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async findAllByDoctorId(id) {
        try {
            return await super.find({ doctor_id: id }, {}, DoctorShiftMapper.toDomain);
        }
        catch (error) {
            this._loggerService.error("Falied To Fetch", error);
            throw new AppError("failed to fetch doctor shifts", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async findAllByDoctorAndDay(doctorId, day) {
        try {
            this._loggerService.info("Fetching Shift by Doctor and day", {
                doctorId,
                day,
            });
            return await super.find({ doctor_id: doctorId, day_of_week: day }, {}, DoctorShiftMapper.toDomain);
        }
        catch (error) {
            this._loggerService.error("Failed to fetch ", error);
            throw new AppError("Failed to Fetch Doctor Shifts", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async create(shift) {
        try {
            this._loggerService.info("Saving Doctor Shift ", shift.shiftId);
            await super.create(shift, DoctorShiftMapper.toPersistance);
            this._loggerService.error("SavedDoctor Shift ", shift.shiftId);
        }
        catch (error) {
            this._loggerService.error("Failed to Save ", error);
            throw new AppError("Failed to save Doctor Shifts", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async update(shift) {
        try {
            this._loggerService.info("Saving Doctor Shift ", shift.shiftId);
            await super.update(shift, shift.shiftId, DoctorShiftMapper.toPersistance);
            this._loggerService.error("SavedDoctor Shift ", shift.shiftId);
        }
        catch (error) {
            this._loggerService.error("Failed to Save ", error);
            throw new AppError("Failed to save Doctor Shifts", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async delete(shiftId) {
        try {
            this._loggerService.info("Deleting Doctor Shift", { shiftId });
            await super.delete(shiftId);
        }
        catch (error) {
            this._loggerService.error("Failed to delete", error);
            throw new AppError("Failed to Delete Doctor Shift", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async findByDoctorIds(doctorIds) {
        try {
            this._loggerService.info("Fetching Shift by DoctorIds", {
                doctorIds,
            });
            const query = {
                doctor_id: { $in: doctorIds },
            };
            return await super.find(query, {}, DoctorShiftMapper.toDomain);
        }
        catch (error) {
            this._loggerService.error("Failed to fetch ", error);
            throw new AppError("Failed to Fetch Doctor Shifts", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async bulkInsert(shifts) {
        try {
            this._loggerService.info("Saving doctorShifts", { shifts });
            await super.insertMany(shifts, DoctorShiftMapper.toPersistance);
        }
        catch (error) {
            this._loggerService.error("Failer to saves shifts", { shifts, error });
            throw new AppError("Failed to Save Doctor Shifts", HTTPStatus.INTERNAL_ERROR);
        }
    }
}
//# sourceMappingURL=DoctorShiftRepository.js.map