import type { Doctor } from "#domain/entities/Doctor.js";
import type { IGetDoctorResponseDTO } from "./IGetDoctorDTO.js";

export class GetDoctorMapper {
  static toDto(
    doctor: Doctor,
    documentUrl: string | null,
    verificationHistory: IGetDoctorResponseDTO["doctor"]["verificationHistory"],
    totalAppointments: number,
    appointmentStatusDistribution: {
      confirmed: number;
      ongoing: number;
      completed: number;
      cancelled: number;
      noShow: number;
      expired: number;
    }
  ): IGetDoctorResponseDTO {
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
