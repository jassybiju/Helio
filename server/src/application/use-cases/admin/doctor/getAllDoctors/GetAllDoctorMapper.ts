import type { Doctor } from "#domain/entities/Doctor.js";
import { CloudinaryFileUploadService } from "#infrastructure/services/CloudinaryFileUploadService.js";
import { S3FileUploadService } from "#infrastructure/services/S3FileUploadService.js";
import type { IGetAllDoctorsResponseDTO } from "./IGetAllDoctorsDTO.js";

export class GetAllDoctorMapper {
  static async toDto(
    doctors: Doctor[],
    getFileUrl: (key: string) => Promise<string>
  ): Promise<IGetAllDoctorsResponseDTO["doctors"]> {
    return await Promise.all(
      doctors.map(async (x) => {
        const profilePic = x.profilePicKey
          ? await getFileUrl(x.profilePicKey)
          : null;
        return {
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
          profilePic: profilePic,
        };
      })
    );
  }
}
