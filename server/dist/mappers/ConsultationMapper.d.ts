import { Consultation } from "#domain/entities/Consultation.js";
import type { ConsultationDoc, ConsultationRawDoc } from "#infrastructure/database/model/ConsultationModel.js";
export declare class ConsultationMapper {
    static toDomain(raw: ConsultationDoc): Consultation;
    static toPersistance(consultation: Consultation): ConsultationRawDoc;
}
//# sourceMappingURL=ConsultationMapper.d.ts.map