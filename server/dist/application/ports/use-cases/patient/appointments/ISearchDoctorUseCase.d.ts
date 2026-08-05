import type { ISearchDoctorsDTO } from "#application/use-cases/patient/appointments/searchDoctors/ISearchDoctorDTO.js";
import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
export interface ISearchDoctorsInput {
    search?: string | undefined;
    specialization?: string | undefined;
    location?: string | undefined;
    consultationType?: CONSULTATION_TYPE | undefined;
    minFee?: number | undefined;
    maxFee?: number | undefined;
    experienceYears?: number | undefined;
    date?: Date | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}
export interface ISearchDoctorUseCase {
    execute(input: ISearchDoctorsInput): Promise<{
        data: ISearchDoctorsDTO[];
        totalCount: number;
    }>;
}
//# sourceMappingURL=ISearchDoctorUseCase.d.ts.map