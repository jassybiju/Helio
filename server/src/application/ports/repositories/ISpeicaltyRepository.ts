import type { Specialty } from "@domain/entities/Specialty.ts";

export interface ISpecialityRepository {
  findAll(): Promise<Specialty[]>;
  findById(id: string): Promise<Specialty | null>;
  create(data: {
    _id: string;
    name: string;
    description?: string | null;
  }): Promise<void>;

  findAllActive(): Promise<Specialty[]>;

  findMany(filters: {
    page?: number | undefined;
    limit?: number | undefined;
  }): Promise<unknown>;
  delete(id: string): Promise<void>;
}
