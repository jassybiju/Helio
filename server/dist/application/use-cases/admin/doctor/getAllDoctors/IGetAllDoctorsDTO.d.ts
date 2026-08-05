export type IGetAllDoctorsRequestDTO = {
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
export type IGetAllDoctorsResponseDTO = {
    doctors: {
        id: string;
        fullName: string;
        email: string;
        status: string;
        verificationStatus: string;
        isVerified: boolean;
        createdAt: string;
        specialization: string | null;
        career_start_year: string;
        gender: string | null;
        profilePic: string | null;
    }[];
    totalCount: number;
    page: number;
    limit: number;
};
//# sourceMappingURL=IGetAllDoctorsDTO.d.ts.map