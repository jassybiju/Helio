import type { IGetRescheduledSlotsDTO } from "@application/use-cases/patient/appointments/cancellation/getResheduledSlots/IGetRescheduledSlotsDTO.ts";

export interface IGetRescheduledSlotsUseCase {
  execute(
    patientId: string,
    appointmentId: string
  ): Promise<IGetRescheduledSlotsDTO>;
}
