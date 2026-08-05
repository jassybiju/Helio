import type { Patient } from "#domain/entities/Patient.js";
import type { IGetAllPatientsResponseDTO } from "./IGetAllPatientsDTO.js";

export class GetAllPatientsMapper {
  static toDto(
    patients: Patient[],
    page: number,
    limit: number,
    totalCount: number,
    getFileURL: (url: string) => string
  ): IGetAllPatientsResponseDTO {
    return {
      totalCount,
      limit,
      page,
      patients: patients.map((x) => ({
        id: x.id,
        fullName: `${x.firstName} ${x?.lastName ?? ""}`,
        email: x.email,
        phone: x.phone,
        status: x.isBlocked ? "blocked" : ("active" as "blocked" | "active"),
        profilePic: x.profilePicKey ? getFileURL(x.profilePicKey) : null,
        verificationStatus: x.isVerified,
        createdAt: x.createdAt.toISOString(),
        dob: x.dob?.toISOString() ?? null,
        gender: x.gender,
        blood_group: x.bloodGroup ?? null,
      })),
    };
  }
}
