import type { IAdminRepository } from "#application/ports/repositories/IAdminRepository.js";
import { Admin } from "#domain/entities/Admin.js";
import { Email } from "#domain/value-objects/Email.js";
export declare class AdminRepository implements IAdminRepository {
    findByEmail(email: Email): Promise<Admin | null>;
    create(admin: Admin): Promise<void>;
    findById(id: string): Promise<Admin | null>;
}
//# sourceMappingURL=AdminRepository.d.ts.map