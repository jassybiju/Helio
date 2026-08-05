import { Patient } from "#domain/entities/Patient.js";
import { Email } from "#domain/value-objects/Email.js";
export class PatientMapper {
    static toPersistance(t) {
        return {
            _id: t.id,
            email: t.email,
            first_name: t.firstName,
            last_name: t.lastName,
            password_hash: t.passwordHashed,
            dob: t.dob,
            gender: t.gender,
            phone: t.phone,
            profile_pic_key: t.profilePicKey,
            blood_group: t.bloodGroup,
            is_blocked: t.isBlocked,
            is_verified: t.isVerified,
            allergens: t.allergens.map((a) => ({
                _id: a._id,
                name: a.name,
                createdAt: a.createdAt,
                severity: a.severity,
            })),
            condition: t.conditions,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
            google_id: t.googleId,
            is_deleted: t.isDeleted,
        };
    }
    static toDomain(raw) {
        return new Patient(raw._id, new Email(raw.email), raw.password_hash, raw.first_name, raw.last_name, raw.gender, raw.dob, raw.blood_group, raw?.profile_pic_key ?? null, raw.phone, raw.is_verified, raw.is_blocked, raw.allergens.map((a) => ({
            _id: a._id,
            name: a.name,
            severity: a.severity,
            createdAt: a.createdAt,
        })), raw.condition.map((c) => ({
            _id: c._id,
            name: c.name,
            createdAt: c.createdAt,
        })), raw.google_id, raw.createdAt, raw.updatedAt, raw.is_deleted);
    }
}
//# sourceMappingURL=PatientMapper.js.map