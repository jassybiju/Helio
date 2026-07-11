import type {
  DoctorAppointmentListItem,
  FindAppointmentsFilter,
  IAppointmentDashboardStatistics,
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
import {
  APPOINTMENT_STATUS,
  BOOKING_PERIOD,
} from "@domain/common/enums/appointment.enum.ts";
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

  async getDoctorBookingTrend(
    doctorId: string,
    period: BOOKING_PERIOD
  ): Promise<{ label: string; count: number }[]> {
    this._logger.info("Fetching Doctor Booking");
    const now = new Date();
    const startDate = new Date();
    now.setHours(23, 59, 59, 999);
    let groupFormat: string;

    switch (period) {
      case BOOKING_PERIOD.WEEK:
        startDate.setDate(now.getDate() - 6);
        groupFormat = "%Y-%m-%d";
        break;

      case BOOKING_PERIOD.MONTH:
        startDate.setDate(now.getDate() - 29);
        groupFormat = "%Y-%m-%d";
        break;

      case BOOKING_PERIOD.YEAR:
        startDate.setMonth(now.getMonth() - 11);
        startDate.setDate(1);
        groupFormat = "%Y-%m";
        break;

      default:
        throw new Error("Invalid period");
    }

    const result = await this.aggregate<{
      _id: string;
      count: number;
    }>([
      {
        $match: {
          doctor_id: doctorId,
          is_deleted: false,
          start_time: {
            $gte: startDate,
            $lte: now,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: groupFormat,
              date: "$start_time",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    console.log(groupFormat, startDate, now, doctorId, result);
    return result.map((item) => ({
      label: item._id,
      count: item.count,
    }));
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
    _start: Date,
    _end: Date
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

    const page = filters.page ?? 1;
    // if (!filters.limit) {
    //   filters.limit = 0;
    // }
    const dataPipeline: PipelineStage.FacetPipelineStage[] = [];
    if (filters.limit) {
      let skip: number = (page - 1) * filters.limit;
      dataPipeline.push({ $skip: skip }, { $limit: filters.limit });
    }

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
          data: dataPipeline,

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
      {
        doctor_id: doctorId,
        start_time: { $gte: start, $lte: end },
        status: {
          $nin: [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.EXPIRED],
        },
      },
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
  async getDashboardStatistics(
    period: BOOKING_PERIOD
  ): Promise<IAppointmentDashboardStatistics> {
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    let analyticsStartDate = new Date(now);
    let groupFormat = "%Y-%m-%d";

    switch (period) {
      case BOOKING_PERIOD.WEEK:
        analyticsStartDate.setDate(now.getDate() - 6);
        analyticsStartDate.setHours(0, 0, 0, 0);
        groupFormat = "%Y-%m-%d";
        break;

      case BOOKING_PERIOD.MONTH:
        analyticsStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
        groupFormat = "%Y-%m-%d";
        break;

      case BOOKING_PERIOD.YEAR:
        analyticsStartDate = new Date(now.getFullYear(), 0, 1);
        groupFormat = "%Y-%m";
        break;
    }

    const [result] = await super.aggregate<{
      totalAppointments: { count: number }[];
      completedAppointments: { count: number }[];
      upcomingAppointments: { count: number }[];
      todayAppointments: { count: number }[];
      appointmentAnalytics: { _id: string; count: number }[];
      appointmentStatusDistribution: { _id: string; count: number }[];
    }>([
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $facet: {
          totalAppointments: [{ $count: "count" }],

          completedAppointments: [
            { $match: { status: "COMPLETED" } },
            { $count: "count" },
          ],

          upcomingAppointments: [
            {
              $match: {
                start_time: {
                  $gt: now,
                },
              },
            },
            { $count: "count" },
          ],

          todayAppointments: [
            {
              $match: {
                start_time: {
                  $gte: startOfDay,
                  $lte: endOfDay,
                },
              },
            },
            { $count: "count" },
          ],

          appointmentAnalytics: [
            {
              $match: {
                created_at: {
                  $gte: analyticsStartDate,
                  $lte: now,
                },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: groupFormat,
                    date: "$created_at",
                  },
                },
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],

          appointmentStatusDistribution: [
            {
              $group: {
                _id: "$status",
                count: {
                  $sum: 1,
                },
              },
            },
          ],
        },
      },
    ]);

    const statusMap = Object.fromEntries(
      result.appointmentStatusDistribution.map((x) => [x._id, x.count])
    );

    const appointmentAnalytics = result.appointmentAnalytics.map((item) => {
      let label = item._id;

      switch (period) {
        case BOOKING_PERIOD.WEEK:
          label = new Date(item._id).toLocaleDateString("en-US", {
            weekday: "short",
          });
          break;

        case BOOKING_PERIOD.MONTH:
          label = new Date(item._id).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          break;

        case BOOKING_PERIOD.YEAR:
          label = new Date(`${item._id}-01`).toLocaleDateString("en-US", {
            month: "short",
          });
          break;
      }

      return {
        label,
        count: item.count,
      };
    });

    return {
      totalAppointments: result.totalAppointments[0]?.count ?? 0,
      completedAppointments: result.completedAppointments[0]?.count ?? 0,
      upcomingAppointments: result.upcomingAppointments[0]?.count ?? 0,
      todayAppointments: result.todayAppointments[0]?.count ?? 0,
      appointmentAnalytics,
      appointmentStatusDistribution: {
        confirmed: statusMap.CONFIRMED ?? 0,
        ongoing: statusMap.ONGOING ?? 0,
        completed: statusMap.COMPLETED ?? 0,
        cancelled:
          (statusMap.CANCELLED_BY_DOCTOR ?? 0) +
          (statusMap.CANCELLED_BY_PATIENT ?? 0),
        noShow: statusMap.NO_SHOW ?? 0,
        expired: statusMap.EXPIRED ?? 0,
      },
    };
  }

  private getISOWeek(date: Date): number {
    const tmp = new Date(date);

    tmp.setHours(0, 0, 0, 0);

    tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));

    const yearStart = new Date(tmp.getFullYear(), 0, 1);

    return Math.ceil(
      ((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
  }
}
