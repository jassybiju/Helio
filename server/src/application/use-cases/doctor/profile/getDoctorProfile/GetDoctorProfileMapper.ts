import type { Doctor } from "@domain/entities/Doctor.ts";

export class GetDoctorProfileMapper {
  static toDto(doctor: Doctor) {
    return {
      id: doctor.id,
      fullName: doctor.fullName,
      email: doctor.email,
      specialization: doctor.specialization,
      bio: doctor.bio,
      yearsOfExperience: doctor.yearsOfExperience,
      onlineFee: doctor.onlineFee,
      clinicFee: doctor.clinicFee,
    };
  }
}
