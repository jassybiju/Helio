import type { Admin } from "@domain/entities/Admin.ts";
import type { Email } from "@domain/value-objects/Email.ts";

export interface IAdminRepository {
  findByEmail(email: Email): Promise<Admin | null>;
}
