import type { Patient } from "@domain/entities/Patient.ts";
import type { IGetAllPatientsResponseDTO } from "./IGetAllPatientsDTO.ts";

export class GetAllPatientsMapper {
  static toDto(
    patients: Patient[],
    page: number,
    limit: number,
    totalCount: number
  ): IGetAllPatientsResponseDTO {
    return {
      totalCount,
      limit,
      page,
      patients: patients.map((x) => ({
        id: x.id,
        fullName: `${x.firstName} ${x.lastName}`,
        email: x.email,
        phone: x.phone,
        status: x.isBlocked ? "blocked" : "active",
        verificationStatus: x.isVerified,
        createdAt: x.createdAt.toISOString(),
        dob: x.dob.toISOString(),
        gender: x.gender,
        blood_group: x.bloodGroup ?? null,
      })),
    };
  }
}
