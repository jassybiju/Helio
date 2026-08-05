import { Doctor } from "#domain/entities/Doctor.js";
import { Email } from "#domain/value-objects/Email.js";
export class DoctorMapper {
    static toDomain(raw) {
        return new Doctor(raw._id, new Email(raw.email), raw.password_hash, raw.full_name, raw.gender, raw.profile_pic_key, raw.specialization, raw.career_start_year, raw.bio, raw.verification_status, raw.document_key, raw.rejection_reason, raw.additional_info, raw.online_fee, raw.clinic_fee, raw.google_id, raw.is_verified, raw.is_blocked, new Date(raw.createdAt), raw.updatedAt, raw.verification_history?.map((x) => ({
            status: x.status,
            reason: x.reason,
            documentKey: x.document_key,
            actedAt: x.acted_at,
        })) ?? []);
    }
    static toPersistance(doctor) {
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
            verification_status: doctor.verificationStatus,
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
//# sourceMappingURL=DoctorMapper.js.map