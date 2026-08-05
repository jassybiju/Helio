import type { Doctor } from "#domain/entities/Doctor.js";
export declare class GetDoctorProfileMapper {
    static toDto(doctor: Doctor, profilePic: string | null): {
        id: string;
        fullName: string;
        email: string;
        specialization: string | null;
        bio: string | null;
        yearsOfExperience: number | null;
        onlineFee: number | null;
        clinicFee: number | null;
        profilePic: string | null;
    };
}
//# sourceMappingURL=GetDoctorProfileMapper.d.ts.map