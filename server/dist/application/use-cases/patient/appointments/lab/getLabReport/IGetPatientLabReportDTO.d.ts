import type { LAB_REPORT_STATUS } from "#domain/common/enums/doctorShift.enum.js";
export interface IGetPatientLabReportsDTO {
    requested: {
        id: string;
        testName: string;
        instructions: string | null;
        requestedAt: Date;
        status: LAB_REPORT_STATUS;
        appointmentId: string;
    }[];
    uploaded: {
        reports: {
            id: string;
            testName: string;
            appointmentId: string;
            documentKey: string | null;
            remarks: string | null;
            requestedAt: Date;
            uploadedAt: Date | null;
            status: LAB_REPORT_STATUS;
        }[];
        totalCount: number;
        page: number;
        limit: number;
    };
}
//# sourceMappingURL=IGetPatientLabReportDTO.d.ts.map