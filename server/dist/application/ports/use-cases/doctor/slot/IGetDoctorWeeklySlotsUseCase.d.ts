import type { IDoctorSlotFilters } from "#application/ports/repositories/IDoctorSlotRepository.js";
import type { DoctorSlot } from "#domain/value-objects/DoctorSlot.js";
export interface IGetDoctorWeeklySlotsUseCase {
    execute(doctorId: string, params: IDoctorSlotFilters): Promise<Record<string, DoctorSlot[]>>;
}
//# sourceMappingURL=IGetDoctorWeeklySlotsUseCase.d.ts.map