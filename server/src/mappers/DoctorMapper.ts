import type { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
import type { GENDER } from "#domain/common/enums/gender.enum.js";
import { Doctor } from "#domain/entities/Doctor.js";
import { Email } from "#domain/value-objects/Email.js";
import type {
  DoctorDoc,
  DoctorRawDoc,
} from "#infrastructure/database/model/DoctorModel.js";

export class DoctorMapper {
  static toDomain(raw: DoctorDoc): Doctor {
    return new Doctor(
      raw._id,
      new Email(raw.email),
      raw.password_hash as string,
      raw.full_name,
      raw.gender as GENDER,
      raw.profile_pic_key as string,
      raw.specialization as string,
      raw.career_start_year as number,
      raw.bio as string,
      raw.verification_status as DOCTOR_VERIFICATION_STATUS,
      raw.document_key as string,
      raw.rejection_reason as string,
      raw.additional_info as string,
      raw.online_fee as number,
      raw.clinic_fee as number,
      raw.google_id as string,
      raw.is_verified,
      raw.is_blocked,
      new Date(raw.createdAt),
      raw.updatedAt,
      raw.verification_history?.map((x) => ({
        status: x.status as DOCTOR_VERIFICATION_STATUS,
        reason: x.reason as string,
        documentKey: x.document_key as string,
        actedAt: x.acted_at as Date,
      })) ?? []
    );
  }

  static toPersistance(doctor: Doctor): Partial<DoctorRawDoc> {
    return {
      _id: doctor.id,
      email: doctor.email,
      full_name: doctor.fullName,
      password_hash: doctor.passwordHash,
      gender: doctor.gender,
      profile_pic_key: doctor.profilePicKey,
      specialization: doctor.specialization,
      career_start_year: doctor.careerStartYear,
      bio: doctor.bio,
      verification_status: doctor.verificationStatus as
        "pending" | "approved" | "rejected" | "resubmitted",
      document_key: doctor.documentKey,
      rejection_reason: doctor.rejectionReason,
      additional_info: doctor.additionalInfo,
      online_fee: doctor.onlineFee,
      clinic_fee: doctor.clinicFee,
      is_verified: doctor.isVerified,
      is_blocked: doctor.isBlocked,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
      verification_history: doctor.verificationHistory.map((x) => ({
        status: x.status,
        reason: x.reason,
        document_key: x.documentKey,
        acted_at: x.actedAt,
      })),
      is_deleted: doctor.isDeleted,
    };
  }
}
