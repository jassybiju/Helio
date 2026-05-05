import type { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";

export interface IGetDoctorBlockSlotUseCase {
  execute(doctorId: string): Promise<DoctorBlockShift[]>;
}
