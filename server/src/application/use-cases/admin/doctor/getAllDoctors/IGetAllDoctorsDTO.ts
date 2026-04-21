import type { Doctor } from "@domain/entities/Doctor.ts";

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

export type IGetAllDoctorsResponseDTO = {
  doctors: Doctor[];
  totalCount: number;
  page: number;
  limit: number;
};
