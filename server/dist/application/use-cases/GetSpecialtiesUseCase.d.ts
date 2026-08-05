import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
import type { IGetSpecialityUsecase } from "#application/ports/use-cases/IGetSpecialityUsecase.js";
export declare class GetSpecialtiesUseCase implements IGetSpecialityUsecase {
    private specialtyRepo;
    constructor(specialtyRepo: ISpecialityRepository);
    execute({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        specialty: {
            _id: string;
            label: string;
            value: string;
        }[];
        count: number;
    }>;
}
//# sourceMappingURL=GetSpecialtiesUseCase.d.ts.map