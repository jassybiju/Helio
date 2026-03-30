import type { IGetAllPatientsRequestDTO } from "@application/use-cases/admin/patient/getAllPatients/IGetAllPatientsDTO.ts";
import type { Patient } from "@domain/entities/Patient.ts";
import type { Email } from "@domain/value-objects/Email.ts";

export interface IPatientFilters {
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

export interface IPatientRepository {
  findByEmail(email: Email): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  save(patient: Patient): Promise<void>;
  findAllWithFilters(
    params: IPatientFilters
  ): Promise<{ patients: Patient[]; totalCount: number }>;
}
