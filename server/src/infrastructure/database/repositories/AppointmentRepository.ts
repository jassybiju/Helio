import type {
  FindAppointmentsFilter,
  IAppointmentRepository,
} from "@application/ports/repositories/IAppointmentRepository.ts";
import { Appointment } from "@domain/entities/Appointment.ts";
import { BaseRepository } from "./BaseRepository.ts";
import {
  appointmentModel,
  type AppointmentRaw,
} from "../model/AppointmentModel.ts";
import { AppointmentMapper } from "../../../mappers/AppointmentMapper.ts";
import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import type { ClientSession, PipelineStage } from "mongoose";
import { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import type { PatientRawDoc } from "../model/PatientModel.ts";
import type { DoctorRawDoc } from "../model/DoctorModel.ts";

export class AppointmentRepository
  extends BaseRepository<Appointment, AppointmentRaw>
  implements IAppointmentRepository
{
  constructor(session?: ClientSession) {
    super(appointmentModel, session);
  }

  withSession(session: ClientSession): IAppointmentRepository {
    return new AppointmentRepository(session);
  }

  async findExistingPatientAppointment(
    patientId: string,
    doctorId: string,
    startTime: Date
  ): Promise<Appointment | null> {
    return await super.findOne(
      { patient_id: patientId, doctor_id: doctorId, start_time: startTime },
      AppointmentMapper.toDomain
    );
  }

  async countOccupiedSlots(
    doctorId: string,
    startTime: Date,
    type: CONSULTATION_TYPE
  ): Promise<number> {
    return await super.count({
      doctor_id: doctorId,
      start_time: startTime,
      consultation_type: type,
      status: { $ne: APPOINTMENT_STATUS.EXPIRED },
    });
  }

  async create(appointment: Appointment): Promise<void> {
    await super.create(appointment, AppointmentMapper.toPersistence);
  }

  async update(appointment: Appointment): Promise<void> {
    await super.update(
      appointment,
      appointment.id,
      AppointmentMapper.toPersistence
    );
  }

  async findActiveInRange(
    doctorId: string,
    start: Date,
    end: Date
  ): Promise<Appointment[]> {
    console.log(start);
    let startTime = new Date(start).setHours(0, 0, 0, 0);
    let endTime = new Date(end).setHours(23, 59, 59, 999);
    return await super.find(
      {
        doctor_id: doctorId,

        // start_time: {
        //   $gte: startTime,
        //   $lt: endTime,
        // },
      },
      {},
      AppointmentMapper.toDomain
    );
  }

  async findById(id: string) {
    return await super.findById(id, AppointmentMapper.toDomain);
  }

  async expirePendingAppointments(): Promise<void> {
    const result = await appointmentModel.updateMany(
      {
        status: APPOINTMENT_STATUS.PENDING,
        expires_at: {
          $lt: new Date(),
        },
      },
      {
        $set: {
          status: APPOINTMENT_STATUS.EXPIRED,
        },
      }
    );
    console.log(result);
  }

  async findManyWithFilters(filters: FindAppointmentsFilter) {
    console.log(filters, 99988);
    const query: Record<string, unknown> = {
      is_deleted: false,
    };

    if (filters.doctorId) {
      query.doctor_id = filters.doctorId;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.consultationType) {
      query.consultation_type = filters.consultationType;
    }

    if (filters.startDate && filters.endDate) {
      query.start_time = {
        $gte: filters.startDate,
        $lte: filters.endDate,
      };
    }

    const skip = (filters.page - 1) * filters.limit;
    console.log(skip, filters);
    const pipeline: PipelineStage[] = [
      {
        $match: query,
      },

      {
        $lookup: {
          from: "patientmodels",
          localField: "patient_id",
          foreignField: "_id",
          as: "patient",
        },
      },

      {
        $unwind: "$patient",
      },
      {
        $lookup: {
          from: "doctormodels",
          localField: "doctor_id",
          foreignField: "_id",
          as: "doctor",
        },
      },

      {
        $unwind: "$doctor",
      },
    ];

    if (filters.patientSearch?.trim()) {
      pipeline.push({
        $match: {
          $or: [
            {
              "patient.first_name": {
                $regex: filters.patientSearch,
                $options: "i",
              },
            },
          ],
        },
      });
    }

    if (filters.doctorSearch?.trim()) {
      pipeline.push({
        $match: {
          $or: [
            {
              "doctor.full_name": {
                $regex: filters.doctorSearch,
                $options: "i",
              },
            },
          ],
        },
      });
    }

    pipeline.push(
      {
        $sort: {
          start_time: 1,
        },
      },

      {
        $facet: {
          data: [{ $skip: skip }, { $limit: filters.limit }],

          totalCount: [{ $count: "count" }],
        },
      }
    );

    const result = await super.aggregate<{
      data: (AppointmentRaw & {
        patient: PatientRawDoc;
        doctor: DoctorRawDoc;
      })[];
      totalCount: { count: number }[];
    }>(pipeline);
    console.log(result[0], pipeline);
    const first = result[0]!;

    return {
      appointments: first.data.map((doc) => ({
        appointment: AppointmentMapper.toDomain(doc),

        patientName: doc.patient.first_name,

        doctorName: doc.doctor.full_name,
      })),

      totalCount: first.totalCount[0]?.count ?? 0,
    };
  }
}
