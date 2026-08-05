export interface IGetDoctorProfileUseCase {
    execute(doctorId: string): Promise<{
        id: string;
        fullName: string;
        email: string;
        specialization: string | null;
        bio: string | null;
        yearsOfExperience: number | null;
        onlineFee: number | null;
        clinicFee: number | null;
        profilePic: string | null;
    }>;
}
//# sourceMappingURL=IGetDoctorProfileUseCase.d.ts.map