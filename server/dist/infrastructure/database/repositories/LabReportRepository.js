import { BaseRepository } from "./BaseRepository.js";
import { labReportModel } from "../model/LabReportModel.js";
import { LabReportMapper } from "../../../mappers/LabReportMapper.js";
import { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
export class LabReportRepository extends BaseRepository {
    _logger;
    constructor(_logger, session) {
        super(labReportModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new LabReportRepository(this._logger, session);
    }
    async create(labReport) {
        await super.create(labReport, LabReportMapper.toPersistance);
    }
    async update(labReport) {
        await super.update(labReport, labReport.id, LabReportMapper.toPersistance);
    }
    async delete(id) {
        await super.delete(id);
    }
    async findById(id) {
        return await super.findById(id, LabReportMapper.toDomain);
    }
    async findByAppointmentId(appointmentId) {
        return await super.find({ appointment_id: appointmentId }, {}, LabReportMapper.toDomain);
    }
    async findByConsultationId(consultationId) {
        return await super.find({ consultation_id: consultationId }, {}, LabReportMapper.toDomain);
    }
    async findRequestedByPatient(patientId) {
        return await super.find({
            patient_id: patientId,
            status: LAB_REPORT_STATUS.REQUESTED,
        }, {
            sort: {
                requested_at: -1,
            },
        }, LabReportMapper.toDomain);
    }
    async findByPatient(patientId, page = 1, limit = 10, status) {
        const skip = (page - 1) * limit;
        const query = {
            patient_id: patientId,
        };
        if (status && status.length > 0) {
            query.status = {
                $in: status,
            };
        }
        const [reports, totalCount] = await Promise.all([
            super.find(query, {
                skip,
                limit,
                sort: {
                    requested_at: -1,
                },
            }, LabReportMapper.toDomain),
            super.count(query),
        ]);
        return {
            reports,
            totalCount,
        };
    }
}
//# sourceMappingURL=LabReportRepository.js.map