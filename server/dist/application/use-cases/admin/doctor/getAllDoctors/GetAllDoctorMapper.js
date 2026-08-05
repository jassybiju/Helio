export class GetAllDoctorMapper {
    static toDto(doctors, getFileUrl) {
        return doctors.map((x) => ({
            id: x.id,
            fullName: x.fullName,
            email: x.email,
            status: x.isBlocked ? "blocked" : "active",
            verificationStatus: x.verificationStatus,
            isVerified: x.isVerified,
            createdAt: new Date(x.createdAt).toISOString(),
            specialization: x.specialization,
            career_start_year: String(x.careerStartYear),
            gender: x.gender,
            profilePic: x.profilePicKey ? getFileUrl(x.profilePicKey ?? "") : null,
        }));
    }
}
//# sourceMappingURL=GetAllDoctorMapper.js.map