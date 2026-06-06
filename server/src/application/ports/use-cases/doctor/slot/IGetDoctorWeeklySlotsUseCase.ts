import type { IDoctorSlotFilters } from "@application/ports/repositories/IDoctorSlotRepository.ts";
import type { DoctorSlot } from "@domain/value-objects/DoctorSlot.ts";

export interface IGetDoctorWeeklySlotsUseCase {
  execute(
    doctorId: string,
    params: IDoctorSlotFilters
  ): Promise<Record<string, DoctorSlot[]>>;
}
