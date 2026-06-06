import type { Patient } from "@domain/entities/Patient.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import type { ClientSession } from "mongoose";

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
  withSession(session: ClientSession): IPatientRepository;
  findByEmail(email: Email): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  create(patient: Patient): Promise<void>;
  update(patient: Patient): Promise<void>;
  findAllWithFilters(
    params: IPatientFilters
  ): Promise<{ patients: Patient[]; totalCount: number }>;

  findByIds(ids: string[]): Promise<Patient[]>;
}
