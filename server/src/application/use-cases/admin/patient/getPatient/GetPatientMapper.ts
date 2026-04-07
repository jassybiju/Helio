import type { Patient } from "@domain/entities/Patient.ts";
import type { IGetPatientResponseDTO } from "./IGetPatientDTO.ts";

export class GetPatientMapper {
  static toDto(patient: Patient): IGetPatientResponseDTO {
    return {
      id: patient.id,
      fullName: patient.fullName,
      email: patient.email,
      gender: patient.gender,
      dob: patient.dob?.toLocaleDateString() ?? null,
      bloodGroup: String(patient.bloodGroup),
      phone: patient.phone,
      isVerified: patient.isVerified,
      isBlocked: patient.isBlocked,
      createdAt: patient.createdAt.toLocaleString(),
      updatedAt: patient.updatedAt.toLocaleString(),
    };
  }
}
