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

  async create(admin: Admin) {
    try {
      await AdminModel.create({
        email: admin.email.value,
        _id: admin.id,
        passwordHash: admin.passwordHash,
      });
    } catch (error) {
      throw new AppError("Error Creating Admin,", HTTPStatus.INTERNAL_ERROR);
    }
  }

  async findById(id: string): Promise<Admin | null> {
    try {
      const adminDoc = await AdminModel.findOne({ _id: id });
      if (!adminDoc) return null;
      return new Admin(
        adminDoc._id!,
        new Email(adminDoc.email!),
        adminDoc.passwordHash!
      );
    } catch (error) {
      throw new AppError("Error Fidnign Admin,", HTTPStatus.INTERNAL_ERROR);
    }
  }
}
