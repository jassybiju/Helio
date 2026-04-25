import type { IDoctorSlotFilters } from "@application/ports/repositories/IDoctorSlotRepository.ts";
import type { IGroupedSlots } from "@application/use-cases/doctor/slot/getDoctorSlots/IGetDoctorWeeklySlotsDTO.ts";
import type { DoctorSlot } from "@domain/entities/DoctorSlot.ts";

export interface IGetDoctorWeeklySlotsUseCase {
  execute(
    doctorId: string,
    params: IDoctorSlotFilters
  ): Promise<IGroupedSlots[]>;
}
