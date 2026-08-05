import type { IChatSessionRepository } from "#application/ports/repositories/IChatSessionRepository.js";
import { BaseRepository } from "./BaseRepository.js";
import type { ChatSession } from "#domain/entities/ChatSession.js";
import { type ChatSessionRaw } from "../model/ChatSessionModel.js";
import type { ClientSession } from "mongoose";
import type { ILogger } from "#application/ports/services/ILogger.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export declare class ChatSessionRepository extends BaseRepository<ChatSession, ChatSessionRaw> implements IChatSessionRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession);
    withSession(session: ClientSession): IChatSessionRepository;
    findManyByUserIdAndType(userId: string, role: USER_ROLES): Promise<ChatSession[]>;
    findById(id: string): Promise<ChatSession | null>;
    findByPatientIdAndDoctorId(patientId: string, doctorId: string): Promise<ChatSession | null>;
    findManyByDoctorId(doctorId: string): Promise<ChatSession[]>;
    create(chatSession: ChatSession): Promise<void>;
    update(chatSession: ChatSession): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ChatSessionRepository.d.ts.map