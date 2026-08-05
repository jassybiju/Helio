import type { ICompleteDoctorProfileRequestDTO, ICompleteDoctorProfileResponseDTO } from "#application/dto/doctor/auth/ICompleteDoctorProfileDTO.js";
export interface ICompleteDoctorProfileUseCase {
    execute(userId: string, input: ICompleteDoctorProfileRequestDTO): Promise<ICompleteDoctorProfileResponseDTO>;
}
//# sourceMappingURL=ICompleteDoctorProfileUseCase.d.ts.map