import { Specialty } from "#domain/entities/Specialty.js";
import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
export declare class SpecialtyRepository implements ISpecialityRepository {
    findAll(): Promise<Specialty[]>;
    findById(id: string): Promise<Specialty | null>;
    create(data: {
        _id: string;
        name: string;
        description?: string;
    }): Promise<void>;
    findAllActive(): Promise<Specialty[]>;
    delete(id: string): Promise<void>;
    findMany(filters: {
        page?: number;
        limit?: number;
    }): Promise<{
        specialty: {
            id: string;
            name: string;
        }[];
        totalCount: number;
    }>;
}
//# sourceMappingURL=SpecialityRepository.d.ts.map