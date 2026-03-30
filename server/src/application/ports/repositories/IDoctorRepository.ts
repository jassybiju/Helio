import type { Doctor } from "@domain/entities/Doctor.ts";
import type { Email } from "@domain/value-objects/Email.ts";

export interface IDocotorFilters {
  search?: string | undefined;
  isVerified?: boolean | undefined;
  isBlocked?: boolean | undefined;
  page: number;
  limit: number;
  createdFrom?: Date | undefined;
  createdTo?: Date | undefined;
  sort: "createdAt" | "first_name";
  order: "asc" | "desc";
}

export interface IDoctorRepository {
  findByEmail(email: Email): Promise<Doctor | null>;
  findById(id: string): Promise<Doctor | null>;
  save(doctor: Doctor): Promise<void>;
  findAllWithFilters(
    params: IDocotorFilters
  ): Promise<{ doctors: Doctor[]; totalCount: number }>;
}
