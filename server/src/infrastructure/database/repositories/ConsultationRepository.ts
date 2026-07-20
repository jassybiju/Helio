import type { IConsultationRepository } from "@application/ports/repositories/IConsultationRepository.ts";
import { Consultation } from "@domain/entities/Consultation.ts";
import { BaseRepository } from "./BaseRepository.ts";
import {
  consultationModel,
  type ConsultationDoc,
} from "../model/ConsultationModel.ts";
import { ConsultationMapper } from "../../../mappers/ConsultationMapper.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ClientSession } from "mongoose";

export class ConsultationRepository
  extends BaseRepository<Consultation, ConsultationDoc>
  implements IConsultationRepository
{
  constructor(
    private readonly _logger: ILogger,
    session?: ClientSession
  ) {
    super(consultationModel, session);
  }

  withSession(session: ClientSession): IConsultationRepository {
    return new ConsultationRepository(this._logger, session);
  }
  async create(consultation: Consultation): Promise<void> {
    this._logger.info("Consultation Creation started", consultation);
    await super.create(consultation, ConsultationMapper.toPersistance);
  }

  async findById(id: string): Promise<Consultation | null> {
    this._logger.info("Finding consultation by id", { id });

    return await super.findById(id, ConsultationMapper.toDomain);
  }

  async findByAppointmentId(
    appointmentId: string
  ): Promise<Consultation | null> {
    this._logger.info("Finding consultation by appointment", { appointmentId });

    return await super.findOne(
      { appointment_id: appointmentId },
      ConsultationMapper.toDomain
    );
  }

  async update(consultation: Consultation): Promise<void> {
    this._logger.info("Updating consultation ", { consultation });

    await super.update(
      consultation,
      consultation.id,
      ConsultationMapper.toPersistance
    );
  }
  async findPatientHistory(
    patientId: string,
    page: number = 1,
    limit: number = 10,
    excludeConsultationId?: string
  ): Promise<Consultation[]> {
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {
      patient_id: patientId,
    };

    if (excludeConsultationId) {
      query._id = {
        $ne: excludeConsultationId,
      };
    }

    return await super.find(
      query,
      {
        skip,
        limit,
        sort: {
          created_at: -1,
        },
      },
      ConsultationMapper.toDomain
    );
  }

  async findLatestPatientConsultation(
    patientId: string,
    excludeConsultationId?: string
  ): Promise<Consultation | null> {
    const query: Record<string, unknown> = { patient_id: patientId };
    if (excludeConsultationId) {
      query._id = { $ne: excludeConsultationId };
    }
    return await super.findOne(query, ConsultationMapper.toDomain, {
      sort: { created_at: -1 },
    });
  }
}
