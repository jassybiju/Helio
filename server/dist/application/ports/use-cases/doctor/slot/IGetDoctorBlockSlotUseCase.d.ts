import type { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
export interface IGetDoctorBlockSlotUseCase {
    execute(doctorId: string): Promise<DoctorBlockShift[]>;
}
//# sourceMappingURL=IGetDoctorBlockSlotUseCase.d.ts.map