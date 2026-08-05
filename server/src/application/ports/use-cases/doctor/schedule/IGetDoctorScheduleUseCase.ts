import type { DoctorShift } from "#domain/entities/DoctorShift.js";

export interface IGetDoctorScheduleUseCase {
  execute(doctorId: string): Promise<DoctorShift[]>;
}
