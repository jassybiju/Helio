import { Patient } from "#domain/entities/Patient.js";
import { Email } from "#domain/value-objects/Email.js";
import { AppError } from "#shared/errors/AppError.js";
import { PatientMapper } from "../../../mappers/PatientMapper.js";
import { patientModel } from "../model/PatientModel.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { BaseRepository } from "./BaseRepository.js";
export class PatientRepository extends BaseRepository {
    _loggerService;
    constructor(_loggerService, session) {
        super(patientModel, session);
        this._loggerService = _loggerService;
    }
    withSession(session) {
        return new PatientRepository(this._loggerService, session);
    }
    findByIds(ids) {
        return super.find({ _id: { $in: ids } }, {}, PatientMapper.toDomain);
    }
    /**
     *  Fetches Patient by email
     * @param email Email ValueObject
     * @returns returns patient or null
     */
    async findByEmail(email) {
        try {
            this._loggerService.info("Finding Patient with email ", email);
            return await super.findOne({ email: email.value }, PatientMapper.toDomain);
        }
        catch (error) {
            this._loggerService.error("Failed to fetch ", error);
            throw new AppError("Failed to fetch patient by email", 500);
        }
    }
    /**
     * Saves the Patient to DB
     * @param patient Patient entity
     *
     */
    async create(patient) {
        try {
            this._loggerService.info("Saving Patient : " + patient.email, patient);
            await super.create(patient, PatientMapper.toPersistance);
            this._loggerService.info("Patient Saved Successfully id : " + patient.id);
        }
        catch (error) {
            this._loggerService.error("Failed to save patient of email ", error);
            throw new AppError("Failed to save patient", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async update(patient) {
        try {
            this._loggerService.info("Saving Patient : " + patient.email, patient);
            await super.update(patient, patient.id, PatientMapper.toPersistance);
            this._loggerService.info("Patient Saved Successfully id : " + patient.id);
        }
        catch (error) {
            this._loggerService.error("Failed to save patient of email ", error);
            throw new AppError("Failed to save patient", HTTPStatus.INTERNAL_ERROR);
        }
    }
    /**
     * Fetches patient by id
     *
     * @param id
     * @returns Patient Entity
     */
    async findById(id) {
        try {
            return await super.findById(id, PatientMapper.toDomain);
        }
        catch (error) {
            this._loggerService.error("Failed to fetch ", error);
            throw new AppError("Failed to fetch patient by id", HTTPStatus.INTERNAL_ERROR);
        }
    }
    /**
     *
     * @param params have type IPatientFilters used for filter criteria
     */
    async findAllWithFilters(params) {
        try {
            const { search, isVerified, isBlocked, page, limit, createdFrom, createdTo, sort, order, } = params;
            const query = {};
            if (search) {
                query.$or = [
                    { first_name: { $regex: search, $options: "i" } },
                    { last_name: { $regex: search, $options: "i" } },
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
            const [patients, totalCount] = await Promise.all([
                super.find(query, { skip, limit, sort: sortOption }, PatientMapper.toDomain),
                super.count(query),
            ]);
            return { patients, totalCount };
        }
        catch (error) {
            this._loggerService.error("Failed to fetch patients", error);
            throw new AppError("Failed to fetch patients", HTTPStatus.INTERNAL_ERROR);
        }
    }
    async getRegistrationAnalytics(period) {
        return super.getRegistrationAnalytics(period);
    }
    async count() {
        return super.count({});
    }
}
//# sourceMappingURL=MongoPatientRepository.js.map