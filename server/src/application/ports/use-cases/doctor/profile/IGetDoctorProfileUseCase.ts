import type { Doctor } from "@domain/entities/Doctor.ts";

export interface IGetDoctorProfileUseCase {
  execute(doctorId: string): Promise<Doctor>;
}
