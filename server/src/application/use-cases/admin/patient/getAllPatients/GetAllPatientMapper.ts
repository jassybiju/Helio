import type { Patient } from "#domain/entities/Patient.js";
import type { IGetAllPatientsResponseDTO } from "./IGetAllPatientsDTO.js";

export class GetAllPatientsMapper {
  static async toDto(
    patients: Patient[],
    page: number,
    limit: number,
    totalCount: number,
    getFileURL: (url: string) => Promise<string>
  ): Promise<IGetAllPatientsResponseDTO> {
    return {
      totalCount,
      limit,
      page,
      patients: await Promise.all(
        patients.map(async (x) => ({
          id: x.id,
          fullName: `${x.firstName} ${x?.lastName ?? ""}`,
          email: x.email,
          phone: x.phone,
          status: x.isBlocked ? "blocked" : ("active" as "blocked" | "active"),
          profilePic: x.profilePicKey
            ? await getFileURL(x.profilePicKey)
            : null,
          verificationStatus: x.isVerified,
          createdAt: x.createdAt.toISOString(),
          dob: x.dob?.toISOString() ?? null,
          gender: x.gender,
          blood_group: x.bloodGroup ?? null,
        }))
      ),
    };
  }
}
