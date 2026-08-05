export class GetSpecialtiesUseCase {
    specialtyRepo;
    constructor(specialtyRepo) {
        this.specialtyRepo = specialtyRepo;
    }
    async execute({ page, limit }) {
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
//# sourceMappingURL=GetSpecialtiesUseCase.js.map