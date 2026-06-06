import type { IGetSlotDTO } from "@application/use-cases/patient/appointments/getSlots/IGetSlotDTO.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";

export interface IGetSlotUseCase {
  execute(doctorId: string): Promise<{ slots: IGetSlotDTO; doctor: Doctor }>;
}
