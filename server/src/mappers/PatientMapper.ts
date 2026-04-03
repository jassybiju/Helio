import { Patient } from "@domain/entities/Patient.ts";
import type { PatientDoc } from "@infrastructure/database/model/PatientModel.ts";
import { Email } from "@domain/value-objects/Email.ts";
import type { BLOOD_GROUP } from "@domain/common/enums/blood-group.enum.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";

export class PatientMapper {
  static toPersistance(t: Patient): PatientDoc {
    return {
      _id: t.id,
      email: t.email,
      first_name: t.firstName,
      last_name: t.lastName,
      passwordHash: t.passwordHashed,
      dob: t.dob,
      gender: t.gender,
      phone: t.phone,
      blood_group: t.bloodGroup,
      is_blocked: t.isBlocked,
      is_verified: t.isVerified,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    };
  }

  static toDomain(raw: PatientDoc): Patient {
    return new Patient(
      raw._id,
      new Email(raw.email),
      raw.passwordHash as string,
      raw.first_name,
      raw.last_name as string,
      raw.gender as GENDER,
      raw.dob as Date,
      raw.blood_group as BLOOD_GROUP,
      raw.phone as string,
      raw.is_verified,
      raw.is_blocked,
      raw.googleId as string,
      raw.createdAt,
      raw.updatedAt
    );
  }
}
