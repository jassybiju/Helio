import { BaseRepository } from "./BaseRepository.js";
import { chatSessionModel, } from "../model/ChatSessionModel.js";
import { ChatSessionMapper } from "../../../mappers/ChatSessionMapper.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class ChatSessionRepository extends BaseRepository {
    _logger;
    constructor(_logger, session) {
        super(chatSessionModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new ChatSessionRepository(this._logger, session);
    }
    findManyByUserIdAndType(userId, role) {
        if (role === USER_ROLES.DOCTOR) {
            return super.find({ doctor_id: userId }, {}, ChatSessionMapper.toDomain);
        }
        else if (role === USER_ROLES.PATIENT) {
            return super.find({ patient_id: userId }, {}, ChatSessionMapper.toDomain);
        }
        else {
            throw new Error("INVALID ROLE");
        }
    }
    findById(id) {
        return super.findById(id, ChatSessionMapper.toDomain);
    }
    findByPatientIdAndDoctorId(patientId, doctorId) {
        return super.findOne({ patient_id: patientId, doctor_id: doctorId }, ChatSessionMapper.toDomain);
    }
    findManyByDoctorId(doctorId) {
        return super.find({ doctor_id: doctorId }, {}, ChatSessionMapper.toDomain);
    }
    async create(chatSession) {
        await super.create(chatSession, ChatSessionMapper.toPersistance);
    }
    async update(chatSession) {
        await super.update(chatSession, chatSession.id, ChatSessionMapper.toPersistance);
    }
    async delete(id) {
        await super.delete(id);
    }
}
//# sourceMappingURL=ChatSessionRepository.js.map