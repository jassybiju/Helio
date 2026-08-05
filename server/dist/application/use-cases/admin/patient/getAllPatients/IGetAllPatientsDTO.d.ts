import type { BLOOD_GROUP } from "#domain/common/enums/blood-group.enum.js";
import type { GENDER } from "#domain/common/enums/gender.enum.js";
export type IGetAllPatientsRequestDTO = {
    search?: string | undefined;
    isBlocked?: boolean | undefined;
    isVerified?: boolean | undefined;
    createdFrom?: Date | undefined;
    createdTo?: Date | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "firstName" | undefined;
    order?: "asc" | "desc" | undefined;
};
export type IGetAllPatientsResponseDTO = {
    patients: {
        id: string;
        fullName: string;
        email: string;
        status: "active" | "blocked";
        verificationStatus: boolean;
        createdAt: string;
        phone: string | null;
        profilePic: string | null;
        blood_group: BLOOD_GROUP | null;
        dob: string | null;
        gender: GENDER | null;
    }[];
    totalCount: number;
    page: number;
    limit: number;
};
//# sourceMappingURL=IGetAllPatientsDTO.d.ts.map