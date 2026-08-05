import { LabReport } from "#domain/entities/LabReport.js";
import type { LabReportDoc } from "#infrastructure/database/model/LabReportModel.js";
export declare class LabReportMapper {
    static toDomain(raw: LabReportDoc): LabReport;
    static toPersistance(domain: LabReport): LabReportDoc;
}
//# sourceMappingURL=LabReportMapper.d.ts.map