import type { Doctor } from "@domain/entities/Doctor.ts";
import type { Email } from "@domain/value-objects/Email.ts";

export interface IDoctorRepository {
  findByEmail(email: Email): Promise<Doctor | null>;
  findById(id: string): Promise<Doctor>;
  save(doctor: Doctor): Promise<void>;
}
