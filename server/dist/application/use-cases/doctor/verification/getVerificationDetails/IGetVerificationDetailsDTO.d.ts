import type { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
export type IGetVerificationDetailsResponseDTO = {
    userId: string;
    verification_status: DOCTOR_VERIFICATION_STATUS;
    rejection_reason: string;
    document_url: string;
    verification_history: {
        actedAt: string;
        document_url: string;
        rejection_reason: string;
        verification_status: DOCTOR_VERIFICATION_STATUS;
    }[];
};
//# sourceMappingURL=IGetVerificationDetailsDTO.d.ts.map