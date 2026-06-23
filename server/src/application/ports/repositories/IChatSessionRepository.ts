import type { ChatSession } from "@domain/entities/ChatSession.ts";
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
}
