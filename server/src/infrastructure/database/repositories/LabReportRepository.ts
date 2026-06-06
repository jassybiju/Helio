import type { ILabReportRepository } from "@application/ports/repositories/ILabReportRepository.ts";
import type { LabReport } from "@domain/entities/LabReport.ts";
import { BaseRepository } from "./BaseRepository.ts";
import { labReportModel, type LabReportDoc } from "../model/LabReportModel.ts";
import type { ClientSession } from "mongoose";
import { LabReportMapper } from "../../../mappers/LabReportMapper.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { LAB_REPORT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";

export class LabReportRepository
  extends BaseRepository<LabReport, LabReportDoc>
  implements ILabReportRepository
{
  constructor(
    private readonly _logger: ILogger,
    session?: ClientSession
  ) {
    super(labReportModel, session);
  }

  withSession(session: ClientSession): ILabReportRepository {
    return new LabReportRepository(this._logger, session);
  }

  async create(labReport: LabReport): Promise<void> {
    await super.create(labReport, LabReportMapper.toPersistance);
  }

  async update(labReport: LabReport): Promise<void> {
    await super.update(labReport, labReport.id, LabReportMapper.toPersistance);
  }

  async delete(id: string): Promise<void> {
    await super.delete(id);
  }

  async findById(id: string): Promise<LabReport | null> {
    return await super.findById(id, LabReportMapper.toDomain);
  }

  async findByAppointmentId(appointmentId: string): Promise<LabReport[]> {
    return await super.find(
      { appointment_id: appointmentId },
      {},
      LabReportMapper.toDomain
    );
  }

  async findByConsultationId(consultationId: string): Promise<LabReport[]> {
    return await super.find(
      { consultation_id: consultationId },
      {},
      LabReportMapper.toDomain
    );
  }

  async findRequestedByPatient(patientId: string): Promise<LabReport[]> {
    return await super.find(
      {
        patient_id: patientId,
        status: LAB_REPORT_STATUS.REQUESTED,
      },
      {
        sort: {
          requested_at: -1,
        },
      },
      LabReportMapper.toDomain
    );
  }

  async findByPatient(
    patientId: string,
    page: number = 1,
    limit: number = 10,
    status?: LAB_REPORT_STATUS[]
  ): Promise<{
    reports: LabReport[];
    totalCount: number;
  }> {
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {
      patient_id: patientId,
    };

    if (status && status.length > 0) {
      query.status = {
        $in: status,
      };
    }

    const [reports, totalCount] = await Promise.all([
      super.find(
        query,
        {
          skip,
          limit,
          sort: {
            requested_at: -1,
          },
        },
        LabReportMapper.toDomain
      ),

      super.count(query),
    ]);

    return {
      reports,
      totalCount,
    };
  }
}
