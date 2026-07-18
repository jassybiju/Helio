import type { ISpecialityRepository } from "@application/ports/repositories/ISpeicaltyRepository.ts";

export class GetSpecialtiesUseCase {
  constructor(private specialtyRepo: ISpecialityRepository) {}

  async execute({ page, limit }: { page?: number; limit?: number }) {
    const specialties = await this.specialtyRepo.findMany({ page, limit });
    // Optional: format for UI (label/value)
    return {
      specialty: specialties.specialty.map((spec) => ({
        _id: spec.id,
        label: spec.name,
        value: spec.name,
      })),
      count: specialties.totalCount,
    };
  }
}
