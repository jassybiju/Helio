import type {
  DoctorAppointmentListItem,
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
import { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import type { ClientSession, PipelineStage, QueryFilter } from "mongoose";
import { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import type { PatientRawDoc } from "../model/PatientModel.ts";
import type { DoctorRawDoc } from "../model/DoctorModel.ts";
import { istToUtc, utcToIst } from "@shared/utils/date.utils.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";

export class AppointmentRepository
  extends BaseRepository<Appointment, AppointmentRaw>
  implements IAppointmentRepository
{
  constructor(
    private readonly _logger: ILogger,
    session?: ClientSession
  ) {
    super(appointmentModel, session);
  }

  withSession(session: ClientSession): IAppointmentRepository {
    return new AppointmentRepository(this._logger, session);
  }

  async countCompletedAppointments(
    patientId: string,
    doctorId: string
  ): Promise<number> {
    return super.count({
      patient_id: patientId,
      doctor_id: doctorId,
      status: APPOINTMENT_STATUS.COMPLETED,
    });
  }
  async findExistingPatientAppointment(
    patientId: string,
    doctorId: string,
    startTime: Date
  ): Promise<Appointment | null> {
    this._logger.info("Fetching existing patient appointment", {
      patientId,
      doctorId,
      startTime,
    });
    return await super.findOne(
      {
        patient_id: patientId,
        doctor_id: doctorId,
        start_time: startTime,
        status: { $ne: APPOINTMENT_STATUS.EXPIRED },
      },
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
    // let startTime = new Date(start).setHours(0, 0, 0, 0);
    // let endTime = new Date(end).setHours(23, 59, 59, 999);
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
    this._logger.debug("Finding APpointmentId,", id);
    return await super.findById(id, AppointmentMapper.toDomain);
  }

  async expirePendingAppointments(): Promise<void> {
    await appointmentModel.updateMany(
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
  }

  async findManyWithFilters(filters: FindAppointmentsFilter) {
    const query: Record<string, unknown> = {
      is_deleted: false,
    };

    if (filters.doctorId) {
      query.doctor_id = filters.doctorId;
    }

    if (filters.patientId) {
      query.patient_id = filters.patientId;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.consultationType) {
      query.consultation_type = filters.consultationType;
    }

    // startDate is UTC
    if (filters.startDate && filters.endDate) {
      query.start_time = {
        $gte: filters.startDate,
        $lte: filters.endDate,
      };
    }

    if (!filters.page) {
      filters.page = 1;
    }
    if (!filters.limit) {
      filters.limit = 0;
    }

    let skip: number = (filters.page - 1) * filters.limit;

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
        $addFields: {
          appointment_priority: {
            $cond: [
              {
                $gte: ["$start_time", new Date()],
              },

              0,

              1,
            ],
          },
          status_priority: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$status", APPOINTMENT_STATUS.ONGOING] },
                  then: 0,
                },
                {
                  case: { $eq: ["$status", APPOINTMENT_STATUS.CONFIRMED] },
                  then: 1,
                },
                {
                  case: { $eq: ["$status", APPOINTMENT_STATUS.COMPLETED] },
                  then: 2,
                },
              ],
              default: 3,
            },
          },
        },
      },
      {
        $sort: {
          status_priority: 1,
          appointment_priority: 1,
          start_time: 1,
          queue_number: 1,
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

  async findOngoingAppointmentByDoctor(
    doctorId: string
  ): Promise<Appointment | null> {
    return super.findOne(
      { doctor_id: doctorId, status: APPOINTMENT_STATUS.ONGOING },
      AppointmentMapper.toDomain
    );
  }

  async findNextQueueAppointment(
    doctorId: string,
    date: Date
  ): Promise<Appointment[]> {
    this._logger.info("finding next queue appointment ", { doctorId, date });
    const startDate = new Date(utcToIst(date));
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(utcToIst(date));
    endDate.setHours(23, 59, 59, 999);

    return await super.find(
      {
        doctor_id: doctorId,
        start_time: { $gte: istToUtc(startDate), $lte: istToUtc(endDate) },
        status: {
          $in: [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.SKIPPED],
        },
      },
      {
        sort: { queueNumber: 1 },
      },
      AppointmentMapper.toDomain
    );
  }

  async countAllAppointmentbyDoctorId(doctorId: string): Promise<number> {
    this._logger.info("Counint", { doctorId });

    return await super.count({
      doctor_id: doctorId,
      status: APPOINTMENT_STATUS.CONFIRMED,
    });
  }

  findDoctorAppointmentForRange(
    doctorId: string,
    startTime: Date,
    endTime: Date
  ): Promise<Appointment[]> {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return super.find(
      { doctor_id: doctorId, start_time: { $gte: start, $lte: end } },
      {},
      AppointmentMapper.toDomain
    );
  }

  findActiveQueueByDoctorAndTime(
    doctorId: string,
    startTime: Date
  ): Promise<Appointment[]> {
    const dayStart = new Date(startTime);
    dayStart.setHours(0, 0, 0, 0);
    return super.find(
      { doctor_id: doctorId, start_time: { $lte: startTime, $gte: dayStart } },
      { sort: { start_time: 1, queue_number: 1 } },
      AppointmentMapper.toDomain
    );
  }

  async findAllWithFilters(
    filters: FindAppointmentsFilter
  ): Promise<DoctorAppointmentListItem[]> {
    const pipeline = this.buildAppointmentPipeline(filters);

    const result = await super.aggregate<
      AppointmentRaw & { patient: PatientRawDoc; doctor: DoctorRawDoc }
    >(pipeline);

    return result.map((doc) => ({
      appointment: AppointmentMapper.toDomain(doc),
      patientName: doc.patient.first_name,
      doctorName: doc.doctor.full_name,
    }));
  }

  private buildAppointmentPipeline(
    filters: FindAppointmentsFilter,
    paginated: boolean = false
  ): PipelineStage[] {
    const query: QueryFilter<AppointmentRaw> = {
      is_deleted: false,
    };

    if (filters.doctorId) {
      query.doctor_id = filters.doctorId;
    }

    if (filters.patientId) {
      query.patient_id = filters.patientId;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters?.statuses?.length) {
      query.status = {
        $in: filters.statuses,
      };
    }

    if (filters.consultationType) {
      query.consultation_type = filters.consultationType;
    }

    if (filters.startDate || filters.endDate) {
      query.start_time = {};
      if (filters.startDate) {
        query.start_time.$gte = istToUtc(filters.startDate);
      }
      if (filters.endDate) {
        query.start_time.$lte = istToUtc(filters.endDate);
      }
    }
    const pipeline: PipelineStage[] = [
      { $match: query },
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

    if (filters.patientSearch) {
      pipeline.push({
        $match: {
          "patient.first_name": {
            $regex: filters.patientSearch,
            $options: "i",
          },
        },
      });
    }

    if (filters.doctorSearch) {
      pipeline.push({
        $match: {
          "doctor.full_name": {
            $regex: filters.doctorSearch,
            $options: "i",
          },
        },
      });
    }

    pipeline.push({
      $addFields: {
        appointment_priority: {
          $cond: [{ $gte: ["$start_time", new Date()] }, 0, 1],
        },
        status_priority: {
          $switch: {
            branches: [
              {
                case: {
                  $eq: ["$status", APPOINTMENT_STATUS.ONGOING],
                },
                then: 0,
              },
              {
                case: {
                  $eq: ["$status", APPOINTMENT_STATUS.CONFIRMED],
                },
                then: 1,
              },
              {
                case: {
                  $eq: ["$status", APPOINTMENT_STATUS.COMPLETED],
                },
                then: 2,
              },
            ],
            default: 3,
          },
        },
      },
    });

    pipeline.push({
      $sort: filters.sort ?? {
        status_priority: 1,
        appointment_priority: 1,
        start_time: 1,
        queueNumber: 1,
      },
    });

    if (paginated) {
      const page = filters.page ?? 1;
      const limit = filters.limit ?? 0;

      const skip = (page - 1) * limit;

      pipeline.push({
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          count: [{ $count: "count" }],
        },
      });
    }
    return pipeline;
  }

  async countAppointmentWithPatientAndDoctor(
    patientId: string,
    doctorId: string
  ) {
    return await super.count({ patient_id: patientId, doctor_id: doctorId });
  }
}
