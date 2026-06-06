import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import type { DoctorSlot } from "@domain/value-objects/DoctorSlot.ts";
import type { ClientSession } from "mongoose";

export interface IDoctorSlotFilters {
  page: number;
  limit?: number;
  dateFrom?: Date;
  dateTo?: Date;
  sort: "day" | "time";
  order: "asc" | "desc";
}

export interface IDoctorSlotRepository {
  /**
   * Finds and returns all slot of the doctor
   * @param doctorId string
   */
  findByDoctor(doctorId: string): Promise<DoctorSlot[]>;

  /**
   * Creates DoctorSlot
   * @param slot DoctorSlot object
   */
  create(slot: DoctorSlot): Promise<void>;

  findAllWithFilters(
    doctorId: string,
    params: IDoctorSlotFilters
  ): Promise<{ slots: DoctorSlot[]; totalCount: number }>;

  /**
   * Bulk inserts slots
   * @param slots DoctorSlot Obj
   */
  bulkInsert(slots: DoctorSlot[]): Promise<void>;

  withSession(session: ClientSession): IDoctorSlotRepository;

  /**
   * Return all Doctors SLtos of that date
   * @param doctorId string
   * @param date Date
   */
  findAllByDoctorAndDay(doctorId: string, date: Date): Promise<DoctorSlot[]>;

  findNextAvailableSlots(
    doctorIds: string[],
    date?: Date,
    consultationType?: CONSULTATION_TYPE
  ): Promise<Map<string, Date>>;
}
