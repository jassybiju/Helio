import { Doctor } from "#domain/entities/Doctor.js";
import type { DoctorDoc, DoctorRawDoc } from "#infrastructure/database/model/DoctorModel.js";
export declare class DoctorMapper {
    static toDomain(raw: DoctorDoc): Doctor;
    static toPersistance(doctor: Doctor): Partial<DoctorRawDoc>;
}
//# sourceMappingURL=DoctorMapper.d.ts.map