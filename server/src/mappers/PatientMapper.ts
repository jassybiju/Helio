import { Patient } from "@domain/entities/Patient.ts";
import type {
  PatientDoc,
  PatientRawDoc,
} from "@infrastructure/database/model/PatientModel.ts";
import { Email } from "@domain/value-objects/Email.ts";
import type { BLOOD_GROUP } from "@domain/common/enums/blood-group.enum.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";
import type { ALLERGEN_SEVERITY } from "@domain/common/enums/allergen_severity.ts";

export class PatientMapper {
  static toPersistance(t: Patient): PatientRawDoc {
    return {
      _id: t.id,
      email: t.email,
      first_name: t.firstName,
      last_name: t.lastName,
      password_hash: t.passwordHashed,
      dob: t.dob,
      gender: t.gender,
      phone: t.phone,
      blood_group: t.bloodGroup,
      is_blocked: t.isBlocked,
      is_verified: t.isVerified,
      allergens: t.allergens.map((a) => ({
        _id: a._id,
        name: a.name,
        createdAt: a.createdAt,
        severity: a.severity as string,
      })),
      condition: t.conditions,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      google_id: t.googleId,
      is_deleted: t.isDeleted,
    };
  }

  static toDomain(raw: PatientDoc): Patient {
    return new Patient(
      raw._id,
      new Email(raw.email),
      raw.password_hash as string,
      raw.first_name,
      raw.last_name as string,
      raw.gender as GENDER,
      raw.dob as Date,
      raw.blood_group as BLOOD_GROUP,
      raw.phone as string,
      raw.is_verified,
      raw.is_blocked,
      raw.allergens.map((a) => ({
        _id: a._id as string,
        name: a.name as string,
        severity: a.severity as ALLERGEN_SEVERITY,
        createdAt: a.createdAt as Date,
      })),
      raw.condition.map((c) => ({
        _id: c._id as string,
        name: c.name,
        createdAt: c.createdAt as Date,
      })),
      raw.google_id as string,
      raw.createdAt,
      raw.updatedAt,
      raw.is_deleted
    );
  }
}
