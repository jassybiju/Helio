import type { IDoctorViewConsultationDTO } from "#application/use-cases/doctor/consultation/viewConsultation/IDoctorViewConsultationDTO.js";
export interface IDoctorViewConsultationUseCase {
    execute(doctorId: string, consultationId: string): Promise<IDoctorViewConsultationDTO>;
}
//# sourceMappingURL=IDoctorViewConsultationUseCase.d.ts.map