import type { IAdminRepository } from "@application/ports/repositories/IAdminRepository.ts";
import { Admin } from "@domain/entities/Admin.ts";
import { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { AdminModel } from "../model/AdminModel.ts";

export class AdminRepository implements IAdminRepository {
  async findByEmail(email: Email): Promise<Admin | null> {
    try {
      const adminDoc = await AdminModel.findOne({ email: email.value });
      console.log(adminDoc);
      if (!adminDoc) return null;
      return new Admin(
        adminDoc._id!,
        new Email(adminDoc.email!),
        adminDoc.passwordHash!
      );
    } catch {
      throw new AppError("Error fetching admin", HTTPStatus.INTERNAL_ERROR);
    }
  }
}
