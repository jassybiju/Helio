import type { Doctor } from "#domain/entities/Doctor.js";
import type { IGetDoctorResponseDTO } from "./IGetDoctorDTO.js";
export declare class GetDoctorMapper {
    static toDto(doctor: Doctor, documentUrl: string | null, verificationHistory: IGetDoctorResponseDTO["doctor"]["verificationHistory"], totalAppointments: number, appointmentStatusDistribution: {
        confirmed: number;
        ongoing: number;
        completed: number;
        cancelled: number;
        noShow: number;
        expired: number;
    }): IGetDoctorResponseDTO;
}
//# sourceMappingURL=GetDoctorMapper.d.ts.map