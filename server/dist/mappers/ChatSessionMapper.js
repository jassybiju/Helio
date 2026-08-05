import { ChatSession } from "#domain/entities/ChatSession.js";
export class ChatSessionMapper {
    static toDomain(raw) {
        return new ChatSession(raw._id, raw.patient_id, raw.doctor_id, raw.status, new Date(raw.expires_at) ?? null, new Date(raw.updated_at) ?? null, new Date(raw.created_at) ?? null);
    }
    static toPersistance(chatSession) {
        return {
            _id: chatSession.id,
            patient_id: chatSession.patientId,
            doctor_id: chatSession.doctorId,
            status: chatSession.status,
            expires_at: chatSession.expiresAt,
            updated_at: chatSession.updatedAt,
            created_at: chatSession.createdAt,
            is_deleted: false,
        };
    }
}
//# sourceMappingURL=ChatSessionMapper.js.map