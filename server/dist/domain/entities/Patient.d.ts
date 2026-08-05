import type { BLOOD_GROUP } from "../common/enums/blood-group.enum.js";
import type { GENDER } from "../common/enums/gender.enum.js";
import type { Email } from "../value-objects/Email.js";
import type { ALLERGEN_SEVERITY } from "#domain/common/enums/allergen_severity.js";
import type { IUpdatePatientInput } from "#application/ports/use-cases/patient/profile/IUpdatePatientProfileUseCase.js";
export declare class Patient {
    private readonly _id;
    private _email;
    private _passwordHash;
    private _firstName;
    private _lastName;
    private _gender;
    private _dob;
    private _bloodGroup;
    private _proficPicKey;
    private _phone;
    private _isVerified;
    private _isBlocked;
    private _allergens;
    private _conditions;
    private _googleId;
    private readonly _createdAt;
    private readonly _updatedAt;
    private readonly _isDeleted;
    constructor(_id: string, _email: Email, _passwordHash: string | null, _firstName: string, _lastName: string | null, _gender: GENDER | null, _dob: Date | null, _bloodGroup: BLOOD_GROUP | null, _proficPicKey: string | null, _phone: string | null, _isVerified: boolean, _isBlocked: boolean, _allergens: Array<{
        _id: string;
        name: string;
        severity: ALLERGEN_SEVERITY;
        createdAt: Date;
    }>, _conditions: Array<{
        _id: string;
        name: string;
        createdAt: Date;
    }>, _googleId: string | null, _createdAt: Date, _updatedAt: Date, _isDeleted?: boolean);
    verifyPatient(): void;
    addAllergen({ allergen, _id, severity, }: {
        allergen: string;
        _id: string;
        severity: ALLERGEN_SEVERITY;
    }): void;
    updateProfile(data: Omit<IUpdatePatientInput, "patientId">): void;
    removeAllergen(allergenId: string): void;
    addCondition({ _id, condition }: {
        _id: string;
        condition: string;
    }): void;
    removeCondition(conditionId: string): void;
    updatePassword(passwordHash: string): void;
    completeProfile({ gender, dob, phone, }: {
        gender: GENDER;
        dob: Date;
        phone: string;
    }): void;
    toogleBlockStatus(): void;
    isProfileComplete(): boolean;
    linkGoogleId(googleId: string): void;
    updateProfilePic(key: string): void;
    get age(): number | null;
    get hasGoogleId(): boolean;
    get googleId(): string | null;
    get id(): string;
    get phone(): string | null;
    get email(): string;
    get firstName(): string;
    get lastName(): string | null;
    get fullName(): string;
    get gender(): GENDER | null;
    get isDeleted(): boolean;
    get bloodGroup(): BLOOD_GROUP | null;
    get dob(): Date | null;
    get isBlocked(): boolean;
    get createdAt(): Date;
    get updatedAt(): Date;
    get isVerified(): boolean;
    get passwordHashed(): string | null;
    get allergens(): {
        _id: string;
        name: string;
        severity: ALLERGEN_SEVERITY;
        createdAt: Date;
    }[];
    get conditions(): {
        _id: string;
        name: string;
        createdAt: Date;
    }[];
    get profilePicKey(): string | null;
    static googleCreate({ id, firstName, googleId, createdAt, updatedAt, email, }: {
        id: string;
        firstName: string;
        googleId: string;
        createdAt: Date;
        updatedAt: Date;
        email: Email;
    }): Patient;
}
//# sourceMappingURL=Patient.d.ts.map