import type { IGetRescheduledSlotsDTO } from "#application/use-cases/patient/appointments/cancellation/getResheduledSlots/IGetRescheduledSlotsDTO.js";
export interface IGetRescheduledSlotsUseCase {
    execute(patientId: string, appointmentId: string): Promise<IGetRescheduledSlotsDTO>;
}
//# sourceMappingURL=IGetRescheduledSlotsUseCase.d.ts.map