import type { Doctor } from "#domain/entities/Doctor.js";
import type { IGetAllDoctorsResponseDTO } from "./IGetAllDoctorsDTO.js";

export class GetAllDoctorMapper {
  static toDto(
    doctors: Doctor[],
    getFileUrl: (key: string) => string
  ): IGetAllDoctorsResponseDTO["doctors"] {
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
