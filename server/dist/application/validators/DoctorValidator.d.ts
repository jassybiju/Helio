import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { Doctor } from "#domain/entities/Doctor.js";
export declare class DoctorValidator {
    private readonly _doctorRepo;
    private readonly _passwordService;
    constructor(_doctorRepo: IDoctorRepository, _passwordService: IPasswordService);
    ensureEmailAvailable(email: string): Promise<Doctor | null>;
    validateDoctorPassword(doctor: Doctor, password: string): Promise<void>;
}
//# sourceMappingURL=DoctorValidator.d.ts.map