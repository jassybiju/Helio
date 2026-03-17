import type { Patient } from "@domain/entities/Patient.ts";
import type { Email } from "@domain/value-objects/Email.ts";

export interface IPatientRepository {
  findByEmail(email: Email): Promise<Patient | null>;
  findById(id: string): Promise<Patient>;
  save(patient: Patient): Promise<void>;
}
