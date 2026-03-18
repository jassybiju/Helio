import { Patient } from "@domain/entities/Patient.ts";
import type { PatientDoc } from "@infrastructure/database/model/PatientModel.ts";
import type { DefaultTimestampProps } from "mongoose";
import { Email } from "@domain/value-objects/Email.ts";
import type { BLOOD_GROUP } from "@domain/common/enums/blood-group.enum.ts";

export class PatientMapper {
  static toPersistance(t: Patient): PatientDoc {
    return {
      id: t.id,
      email: t.email,
      first_name: t.firstName,
      last_name: t.lastName,
      passwordHash: t.passwordHashed,
      dob: t.dob,
      gender: t.gender,
      blood_group: t.bloodGroup,
      is_blocked: t.isBlocked,
      is_verified: t.isVerified,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    };
  }

  static toDomain(raw: PatientDoc): Patient {
    return new Patient(
      raw.id,
      new Email(raw.email),
      raw.passwordHash,
      raw.first_name,
      raw.last_name,
      raw.gender,
      raw.dob,
      raw.blood_group as BLOOD_GROUP,
      raw.is_verified,
      raw.is_blocked,
      raw.createdAt,
      raw.updatedAt
    );
  }
}
