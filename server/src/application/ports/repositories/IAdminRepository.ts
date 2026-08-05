import type { Admin } from "#domain/entities/Admin.js";
import type { Email } from "#domain/value-objects/Email.js";

export interface IAdminRepository {
  findByEmail(email: Email): Promise<Admin | null>;
  create(admin: Admin): Promise<void>;
  findById(id: string): Promise<Admin | null>;
}
