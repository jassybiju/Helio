import type { GENDER } from "@domain/common/enums/gender.enum.ts";

export type IGetAllDoctorsRequestDTO = {
  search?: string | undefined;
  isBlocked?: boolean | undefined;
  isVerified?: boolean | undefined;
  createdFrom?: Date | undefined;
  createdTo?: Date | undefined;
  page?: number | undefined;
  limit?: number | undefined;
  sortBy?: "createdAt" | "firstName" | undefined;
  order?: "asc" | "desc" | undefined;
};

export type IGetAllDoctorssResponseDTO = {
  doctors: {
    id: string;
    fullName: string;
    email: string;
    status: "active" | "blocked";
    verificationStatus: boolean;
    isVerified: boolean;
    createdAt: string;
    specialization: string;
    career_start_year: string;
    gender: GENDER;
  }[];
  totalCount: number;
  page: number;
  limit: number;
};
