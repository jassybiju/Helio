import type { DoctorShift } from "@domain/entities/DoctorShift.ts";

export interface IGetDoctorScheduleUseCase {
  execute(doctorId: string): Promise<DoctorShift[]>;
}
