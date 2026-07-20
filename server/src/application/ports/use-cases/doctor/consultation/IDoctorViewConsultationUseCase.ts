import type { IDoctorViewConsultationDTO } from "@application/use-cases/doctor/consultation/viewConsultation/IDoctorViewConsultationDTO.ts";

export interface IDoctorViewConsultationUseCase {
  execute(
    doctorId: string,
    consultationId: string
  ): Promise<IDoctorViewConsultationDTO>;
}
