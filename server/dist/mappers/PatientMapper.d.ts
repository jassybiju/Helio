import { Patient } from "#domain/entities/Patient.js";
import type { PatientDoc, PatientRawDoc } from "#infrastructure/database/model/PatientModel.js";
export declare class PatientMapper {
    static toPersistance(t: Patient): PatientRawDoc;
    static toDomain(raw: PatientDoc): Patient;
}
//# sourceMappingURL=PatientMapper.d.ts.map