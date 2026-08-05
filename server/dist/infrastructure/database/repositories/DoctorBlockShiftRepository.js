import { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import { BaseRepository } from "./BaseRepository.js";
import { blockShiftModel, } from "../model/BlockShiftModel.js";
import { DoctorBlockShiftMapper } from "../../../mappers/DoctorBlockShiftMapper.js";
import { istToUtc } from "#shared/utils/date.utils.js";
export class DoctorBlockShiftRepository extends BaseRepository {
    _logger;
    constructor(_logger, session) {
        super(blockShiftModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new DoctorBlockShiftRepository(this._logger, session);
    }
    async findByDoctorFromRange(doctorId, startDate, endDate) {
        this._logger.info("Fetching Blocks Shift by Start and end Date", {
            startDate,
            endDate,
            doctorId,
        });
        const startTime = new Date(startDate).setHours(0, 0, 0, 0);
        const endTime = new Date(endDate).setHours(23, 59, 59, 999);
        return await super.find({ doctor_id: doctorId, start_time: { $gte: startTime, $lte: endTime } }, {}, DoctorBlockShiftMapper.toDomain);
    }
    async findByDate(doctorId, date) {
        this._logger.info("Fetching Blocks Shift by Start and end Date", {
            date,
            doctorId,
        });
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        return (await super.find({ doctor_id: doctorId, start_time: { $gte: startDate, $lte: endDate } }, {}, DoctorBlockShiftMapper.toDomain));
    }
    async create(blockShift) {
        await super.create(blockShift, DoctorBlockShiftMapper.toPersistance);
    }
    async findByDoctor(doctorId) {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        return await super.find({ doctor_id: doctorId, start_time: { $gte: istToUtc(startDate) } }, {}, DoctorBlockShiftMapper.toDomain);
    }
    async findById(id) {
        return await super.findById(id, DoctorBlockShiftMapper.toDomain);
    }
    async update(blockShift) {
        return await super.update(blockShift, blockShift.id, DoctorBlockShiftMapper.toPersistance);
    }
    async delete(id) {
        return await super.delete(id);
    }
}
//# sourceMappingURL=DoctorBlockShiftRepository.js.map