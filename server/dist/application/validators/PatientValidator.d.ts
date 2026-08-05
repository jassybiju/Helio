import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IPasswordService } from "#application/ports/services/IPasswordService.js";
import type { Patient } from "#domain/entities/Patient.js";
export declare class PatientValidator {
    private readonly _patientRepo;
    private readonly _passwordService;
    constructor(_patientRepo: IPatientRepository, _passwordService: IPasswordService);
    ensureEmailAvailable(email: string): Promise<Patient | null>;
    /**
     * Checks if the password is valid for the patient
     * @param patient Patient Entity
     * @param password Password to validate with the hash
     */
    validatePatientPassword(patient: Patient, password: string): Promise<void>;
}
//# sourceMappingURL=PatientValidator.d.ts.map