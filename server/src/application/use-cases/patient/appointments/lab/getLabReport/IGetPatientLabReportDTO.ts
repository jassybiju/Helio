import type { LAB_REPORT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";

export interface IGetPatientLabReportsDTO {
  requested: {
    id: string;
    testName: string;
    instructions: string | null;
    requestedAt: Date;
    status: LAB_REPORT_STATUS;
  }[];

  uploaded: {
    reports: {
      id: string;
      testName: string;

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
