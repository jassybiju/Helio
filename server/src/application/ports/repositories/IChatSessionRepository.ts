import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import type { ChatSession } from "#domain/entities/ChatSession.js";
import type { ClientSession } from "mongoose";

export interface IChatSessionRepository {
  withSession(session: ClientSession): IChatSessionRepository;
  findById(id: string): Promise<ChatSession | null>;
  create(chatSession: ChatSession): Promise<void>;
  update(chatSession: ChatSession): Promise<void>;
  delete(id: string): Promise<void>;

  /**
   * Find ChatSession by patientId or doctorId
   * @param patientId
   * @param doctorId
   */
  findByPatientIdAndDoctorId(
    patientId: string,
    doctorId: string
  ): Promise<ChatSession | null>;

  /**
   * Find Chatsession by doctor Id
   * @param doctorId
   */
  findManyByDoctorId(doctorId: string): Promise<ChatSession[]>;

  /**
   * Find Chatsession by user Id and role
   * @param userId
   * @param role
   */
  findManyByUserIdAndType(
    userId: string,
    role: USER_ROLES
  ): Promise<ChatSession[]>;
}
