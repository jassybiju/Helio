import type { DoctorSlot } from "#domain/value-objects/DoctorSlot.js";
import type { IWeeklySlotsResponseDTO } from "./IGetDoctorWeeklySlotsDTO.js";
export declare class GetDoctorWeeklySlotsMapper {
    static toDto(data: Record<string, DoctorSlot[]>): IWeeklySlotsResponseDTO;
}
//# sourceMappingURL=GetDoctorWeeklySlotsMapper.d.ts.map