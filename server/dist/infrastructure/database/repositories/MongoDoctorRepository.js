import { doctorModel } from "../model/DoctorModel.js";
import { DoctorMapper } from "../../../mappers/DoctorMapper.js";
import { BaseRepository } from "./BaseRepository.js";
import { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
export class MongoDoctorRepository extends BaseRepository {
    _loggerService;
    constructor(_loggerService, session = null) {
        super(doctorModel, session);
        this._loggerService = _loggerService;
    }
    withSession(session) {
        return new MongoDoctorRepository(this._loggerService, session);
    }
    async findByEmail(email) {
        this._loggerService.info("Finding Doctor with email", email);
        return await super.findOne({ email: email.value }, DoctorMapper.toDomain);
    }
    async create(doctor) {
        this._loggerService.info("Saving Doctor", doctor.email);
        await super.create(doctor, DoctorMapper.toPersistance);
        this._loggerService.info("Doctor Saved Successfully id : " + doctor.id);
    }
    async update(doctor) {
        this._loggerService.info("Saving Doctor", doctor.email);
        await super.update(doctor, doctor.id, DoctorMapper.toPersistance);
        this._loggerService.info("Doctor Saved Successfully id : " + doctor.id);
    }
    async findById(id) {
        return await super.findById(id, DoctorMapper.toDomain);
    }
    async findAllWithFilters(params) {
        const { search, isVerified, isBlocked, page, limit, createdFrom, createdTo, sort, order, } = params;
        const query = {};
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
            ];
        }
        if (isVerified !== undefined) {
            query.is_verified = isVerified;
        }
        if (isBlocked !== undefined) {
            query.is_blocked = isBlocked;
        }
        if (createdFrom || createdTo) {
            query.createdAt = {};
            if (createdFrom)
                query.createdAt.$gte = createdFrom;
            if (createdTo)
                query.createdAt.$lte = createdTo;
        }
        const skip = (page - 1) * limit;
        const sortOption = {
            [sort]: order === "asc" ? 1 : -1,
        };
        const [doctors, totalCount] = await Promise.all([
            super.find(query, { skip, limit, sort: sortOption }, DoctorMapper.toDomain),
            super.count(query),
        ]);
        return { doctors, totalCount };
    }
    async countDoctors(specialization) {
        return await doctorModel.find({ specialization }).countDocuments();
    }
    async findAllActive() {
        return await super.find({
            is_blocked: false,
            verification_status: "approved",
            is_deleted: false,
        }, {}, DoctorMapper.toDomain);
    }
    async searchByName(query) {
        return super.find({
            $or: [
                {
                    full_name: {
                        $regex: query,
                        $options: "i",
                    },
                },
                {
                    specialization: {
                        $regex: query,
                        $options: "i",
                    },
                },
            ],
            is_blocked: false,
            verification_status: "approved",
        }, {
            sort: { fullName: 1 },
        }, DoctorMapper.toDomain);
    }
    async search(params) {
        this._loggerService.info("Fetching Doctors", { params });
        const { name, specialization, minFee, maxFee, minExperienceYears, page = 1, limit = 10, } = params;
        const query = {
            is_deleted: false,
            is_blocked: false,
            is_verified: true,
            verification_status: DOCTOR_VERIFICATION_STATUS.APPROVED,
        };
        if (name) {
            query.full_name = { $regex: name, $options: "i" };
        }
        if (specialization) {
            query.specialization = { $regex: specialization, $options: "i" };
        }
        if (minFee !== undefined || maxFee !== undefined) {
            query.$or = [
                {
                    online_fee: {
                        ...(minFee !== undefined && { $gte: minFee }),
                        ...(maxFee !== undefined && { $lte: maxFee }),
                    },
                },
                {
                    clinic_fee: {
                        ...(minFee !== undefined && { $gte: minFee }),
                        ...(maxFee !== undefined && { $lte: maxFee }),
                    },
                },
            ];
        }
        if (minExperienceYears !== undefined) {
            const currentYear = new Date().getFullYear();
            query.career_start_year = {
                $lte: currentYear - minExperienceYears,
            };
        }
        const skip = (page - 1) * limit;
        const [doctors, totalCount] = await Promise.all([
            super.find(query, { skip, limit }, DoctorMapper.toDomain),
            super.count(query),
        ]);
        return {
            doctors,
            totalCount,
        };
    }
    async getRegistrationAnalytics(period) {
        return super.getRegistrationAnalytics(period);
    }
    async count() {
        return super.count({});
    }
}
//# sourceMappingURL=MongoDoctorRepository.js.map