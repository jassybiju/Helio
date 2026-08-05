import { Consultation } from "#domain/entities/Consultation.js";
import { BaseRepository } from "./BaseRepository.js";
import { consultationModel, } from "../model/ConsultationModel.js";
import { ConsultationMapper } from "../../../mappers/ConsultationMapper.js";
export class ConsultationRepository extends BaseRepository {
    _logger;
    constructor(_logger, session) {
        super(consultationModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new ConsultationRepository(this._logger, session);
    }
    async create(consultation) {
        this._logger.info("Consultation Creation started", consultation);
        await super.create(consultation, ConsultationMapper.toPersistance);
    }
    async findById(id) {
        this._logger.info("Finding consultation by id", { id });
        return await super.findById(id, ConsultationMapper.toDomain);
    }
    async findByAppointmentId(appointmentId) {
        this._logger.info("Finding consultation by appointment", { appointmentId });
        return await super.findOne({ appointment_id: appointmentId }, ConsultationMapper.toDomain);
    }
    async update(consultation) {
        this._logger.info("Updating consultation ", { consultation });
        await super.update(consultation, consultation.id, ConsultationMapper.toPersistance);
    }
    async findPatientHistory(patientId, page = 1, limit = 10, excludeConsultationId) {
        const skip = (page - 1) * limit;
        const query = {
            patient_id: patientId,
        };
        if (excludeConsultationId) {
            query._id = {
                $ne: excludeConsultationId,
            };
        }
        return await super.find(query, {
            skip,
            limit,
            sort: {
                created_at: -1,
            },
        }, ConsultationMapper.toDomain);
    }
    async countAllPatientHistory(patientId) {
        const query = { patient_id: patientId };
        return await super.count(query);
    }
    async findLatestPatientConsultation(patientId, excludeConsultationId) {
        const query = { patient_id: patientId };
        if (excludeConsultationId) {
            query._id = { $ne: excludeConsultationId };
        }
        return await super.findOne(query, ConsultationMapper.toDomain, {
            sort: { created_at: -1 },
        });
    }
}
//# sourceMappingURL=ConsultationRepository.js.map