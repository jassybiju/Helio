import type { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";

export interface IDoctorBlockShiftRepository {
  findByDate(doctorId: string, date: Date): Promise<DoctorBlockShift[]>;

  findByDoctor(doctorId: string): Promise<DoctorBlockShift[]>;

  create(blockShift: DoctorBlockShift): Promise<void>;

  findByDoctorFromRange(
    doctorId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DoctorBlockShift[]>;
}
