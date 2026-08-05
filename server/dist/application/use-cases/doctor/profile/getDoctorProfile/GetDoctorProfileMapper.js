export class GetDoctorProfileMapper {
    static toDto(doctor, profilePic) {
        return {
            id: doctor.id,
            fullName: doctor.fullName,
            email: doctor.email,
            specialization: doctor.specialization,
            bio: doctor.bio,
            yearsOfExperience: doctor.yearsOfExperience,
            onlineFee: doctor.onlineFee,
            clinicFee: doctor.clinicFee,
            profilePic: profilePic ?? null,
        };
    }
}
//# sourceMappingURL=GetDoctorProfileMapper.js.map