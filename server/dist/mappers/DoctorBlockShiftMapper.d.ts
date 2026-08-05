import { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import type { BlockShiftDoc } from "#infrastructure/database/model/BlockShiftModel.js";
export declare class DoctorBlockShiftMapper {
    static toDomain(raw: BlockShiftDoc): DoctorBlockShift;
    static toPersistance(blockShift: DoctorBlockShift): BlockShiftDoc;
}
//# sourceMappingURL=DoctorBlockShiftMapper.d.ts.map