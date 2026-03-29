import type { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";
import { Doctor } from "@domain/entities/Doctor.ts";
import { Email } from "@domain/value-objects/Email.ts";
import type { DoctorDoc } from "@infrastructure/database/model/DoctorModel.ts";

export class DoctorMapper {
  static toDomain(raw: DoctorDoc): Doctor {
    return new Doctor(
      raw._id,
      new Email(raw.email),
      raw.passwordHash,
      raw.fullName,
      raw.gender,
      raw.specialization,
      raw.career_start_year,
      raw.bio as string,
      raw.verification_status as DOCTOR_VERIFICATION_STATUS,
      raw.document_key as string,
      raw.rejection_reason as string,
      raw.online_fee as number,
      raw.clinic_fee as number,
      raw.is_verified,
      raw.is_blocked,
      raw.createdAt,
      raw.updatedAt
    );
  }

  static toPersistance(doctor: Doctor): DoctorDoc {
    console.log(doctor.id);
    return {
      _id: doctor.id,
      email: doctor.email,
      fullName: doctor.fullName,
      passwordHash: doctor.passwordHash,
      gender: doctor.gender,
      specialization: doctor.specialization,
      career_start_year: doctor.careerStartYear,
      bio: doctor.bio,
      verification_status: doctor.verificationStatus as
        | "pending"
        | "approved"
        | "rejected"
        | "resubmitted",
      document_key: doctor.documentKey,
      rejection_reason: doctor.rejectionReason,
      online_fee: doctor.onlineFee,
      clinic_fee: doctor.clinicFee,
      is_verified: doctor.isVerified,
      is_blocked: doctor.isBlocked,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };
  }
}
