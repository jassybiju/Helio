import type { IChatSessionRepository } from "@application/ports/repositories/IChatSessionRepository.ts";
import { BaseRepository } from "./BaseRepository.ts";
import type { ChatSession } from "@domain/entities/ChatSession.ts";
import {
  chatSessionModel,
  type ChatSessionRaw,
} from "../model/ChatSessionModel.ts";
import type { ClientSession } from "mongoose";
import { ChatSessionMapper } from "../../../mappers/ChatSessionMapper.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export class ChatSessionRepository
  extends BaseRepository<ChatSession, ChatSessionRaw>
  implements IChatSessionRepository
{
  constructor(
    private readonly _logger: ILogger,
    session?: ClientSession
  ) {
    super(chatSessionModel, session);
  }

  withSession(session: ClientSession): IChatSessionRepository {
    return new ChatSessionRepository(this._logger, session);
  }

  findManyByUserIdAndType(
    userId: string,
    role: USER_ROLES
  ): Promise<ChatSession[]> {
    if (role === USER_ROLES.DOCTOR) {
      return super.find({ doctor_id: userId }, {}, ChatSessionMapper.toDomain);
    } else if (role === USER_ROLES.PATIENT) {
      return super.find({ patient_id: userId }, {}, ChatSessionMapper.toDomain);
    } else {
      throw new Error("INVALID ROLE");
    }
  }

  findById(id: string) {
    return super.findById(id, ChatSessionMapper.toDomain);
  }

  findByPatientIdAndDoctorId(
    patientId: string,
    doctorId: string
  ): Promise<ChatSession | null> {
    return super.findOne(
      { patient_id: patientId, doctor_id: doctorId },
      ChatSessionMapper.toDomain
    );
  }

  findManyByDoctorId(doctorId: string): Promise<ChatSession[]> {
    return super.find({ doctor_id: doctorId }, {}, ChatSessionMapper.toDomain);
  }

  async create(chatSession: ChatSession): Promise<void> {
    await super.create(chatSession, ChatSessionMapper.toPersistance);
  }
  async update(chatSession: ChatSession): Promise<void> {
    await super.update(
      chatSession,
      chatSession.id,
      ChatSessionMapper.toPersistance
    );
  }
  async delete(id: string): Promise<void> {
    await super.delete(id);
  }
}
