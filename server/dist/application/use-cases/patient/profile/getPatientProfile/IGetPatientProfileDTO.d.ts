import type { ALLERGEN_SEVERITY } from "#domain/common/enums/allergen_severity.js";
export type IGetPatientProfileDTO = {
    id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    gender: string | null;
    dob: string | null;
    bloodGroup: string | null;
    phone: string | null;
    allergens: Array<{
        _id: string;
        name: string;
        severity: ALLERGEN_SEVERITY;
        createdAt: Date;
    }>;
    conditions: Array<{
        _id: string;
        name: string;
        createdAt: Date;
    }>;
    profilePic: string | null;
};
//# sourceMappingURL=IGetPatientProfileDTO.d.ts.map