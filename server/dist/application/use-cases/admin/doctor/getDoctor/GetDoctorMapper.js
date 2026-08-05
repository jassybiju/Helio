export class GetDoctorMapper {
    static toDto(doctor, documentUrl, verificationHistory, totalAppointments, appointmentStatusDistribution) {
        return {
            doctor: {
                id: doctor.id,
                email: doctor.email,
                fullName: doctor.fullName,
                gender: doctor.gender,
                specialization: doctor.specialization,
                careerStartYear: doctor.careerStartYear,
                bio: doctor.bio,
                verificationStatus: doctor.verificationStatus,
                rejectionReason: doctor.rejectionReason,
                documentUrl,
                additionalInfo: doctor.additionalInfo,
                onlineFee: doctor.onlineFee,
                clinicFee: doctor.clinicFee,
                isVerified: doctor.isVerified,
                isBlocked: doctor.isBlocked,
                verificationHistory,
                createdAt: doctor.createdAt.toISOString(),
                updatedAt: doctor.updatedAt.toISOString(),
            },
            totalAppointments,
            appointmentStatusDistribution,
        };
    }
}
//# sourceMappingURL=GetDoctorMapper.js.map