import type { ISpecialityRepository } from "@application/ports/repositories/ISpeicaltyRepository.ts";

export class GetSpecialtiesUseCase {
  constructor(private specialtyRepo: ISpecialityRepository) {}

  async execute() {
    const specialties = await this.specialtyRepo.findAllActive();

    // Optional: format for UI (label/value)
    return specialties.map((spec) => ({
      _id: spec.id,
      label: spec.name,
      value: spec.name,
    }));
  }
}
