import type { Doctor } from "@domain/entities/Doctor.ts";
import type { IGetAllDoctorsResponseDTO } from "./IGetAllDoctorsDTO.ts";

export class GetAllDoctorMapper {
  static toDto(doctors: Doctor[]) {
    return doctors.map((x) => ({
      id: x.id,
      fullName: x.fullName,
      email: x.email,
      status: x.isBlocked ? "blocked" : "active",
      verificationStatus: x.verificationStatus,
      isVerified: x.isVerified,
      createdAt: x.createdAt.toISOString(),
      specialization: x.specialization,
      career_start_year: String(x.careerStartYear),
      gender: x.gender,
    }));
  }
}
