import { Appointment } from "#domain/entities/Appointment.js";
import { BaseRepository } from "./BaseRepository.js";
import { appointmentModel, } from "../model/AppointmentModel.js";
import { AppointmentMapper } from "../../../mappers/AppointmentMapper.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import { APPOINTMENT_STATUS, BOOKING_PERIOD, } from "#domain/common/enums/appointment.enum.js";
import { istToUtc, utcToIst } from "#shared/utils/date.utils.js";
export class AppointmentRepository extends BaseRepository {
    _logger;
    constructor(_logger, session) {
        super(appointmentModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new AppointmentRepository(this._logger, session);
    }
    async countCompletedAppointments(patientId, doctorId) {
        return super.count({
            patient_id: patientId,
            doctor_id: doctorId,
            status: APPOINTMENT_STATUS.COMPLETED,
        });
    }
    async findExistingPatientAppointment(patientId, doctorId, startTime) {
        this._logger.info("Fetching existing patient appointment", {
            patientId,
            doctorId,
            startTime,
        });
        return await super.findOne({
            patient_id: patientId,
            doctor_id: doctorId,
            start_time: startTime,
            status: { $ne: APPOINTMENT_STATUS.EXPIRED },
        }, AppointmentMapper.toDomain);
    }
    async getDoctorBookingTrend(doctorId, period) {
        this._logger.info("Fetching Doctor Booking");
        const now = new Date();
        const startDate = new Date();
        now.setHours(23, 59, 59, 999);
        let groupFormat;
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
        const result = await this.aggregate([
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
        return result.map((item) => ({
            label: item._id,
            count: item.count,
        }));
    }
    async countOccupiedSlots(doctorId, startTime, type) {
        return await super.count({
            doctor_id: doctorId,
            start_time: startTime,
            consultation_type: type,
            status: { $ne: APPOINTMENT_STATUS.EXPIRED },
        });
    }
    async create(appointment) {
        await super.create(appointment, AppointmentMapper.toPersistence);
    }
    async update(appointment) {
        await super.update(appointment, appointment.id, AppointmentMapper.toPersistence);
    }
    async findActiveInRange(doctorId, _start, _end) {
        // let startTime = new Date(start).setHours(0, 0, 0, 0);
        // let endTime = new Date(end).setHours(23, 59, 59, 999);
        return await super.find({
            doctor_id: doctorId,
            // start_time: {
            //   $gte: startTime,
            //   $lt: endTime,
            // },
        }, {}, AppointmentMapper.toDomain);
    }
    async findById(id) {
        this._logger.debug("Finding APpointmentId,", id);
        return await super.findById(id, AppointmentMapper.toDomain);
    }
    async expirePendingAppointments() {
        await appointmentModel.updateMany({
            status: APPOINTMENT_STATUS.PENDING,
            expires_at: {
                $lt: new Date(),
            },
        }, {
            $set: {
                status: APPOINTMENT_STATUS.EXPIRED,
            },
        });
    }
    async findManyWithFilters(filters) {
        const query = {
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
        const dataPipeline = [];
        if (filters.limit) {
            let skip = (page - 1) * filters.limit;
            dataPipeline.push({ $skip: skip }, { $limit: filters.limit });
        }
        const pipeline = [
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
        pipeline.push({
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
        }, {
            $sort: {
                status_priority: 1,
                appointment_priority: 1,
                start_time: filters?.order === "desc" ? -1 : 1,
                queue_number: 1,
            },
        }, {
            $facet: {
                data: dataPipeline,
                totalCount: [{ $count: "count" }],
            },
        });
        const result = await super.aggregate(pipeline);
        const first = result[0];
        return {
            appointments: first.data.map((doc) => ({
                appointment: AppointmentMapper.toDomain(doc),
                patientName: doc.patient.first_name,
                doctorName: doc.doctor.full_name,
            })),
            totalCount: first.totalCount[0]?.count ?? 0,
        };
    }
    async findOngoingAppointmentByDoctor(doctorId) {
        return super.findOne({ doctor_id: doctorId, status: APPOINTMENT_STATUS.ONGOING }, AppointmentMapper.toDomain);
    }
    async findNextQueueAppointment(doctorId, date) {
        this._logger.info("finding next queue appointment ", { doctorId, date });
        const startDate = new Date(utcToIst(date));
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(utcToIst(date));
        endDate.setHours(23, 59, 59, 999);
        return await super.find({
            doctor_id: doctorId,
            start_time: { $gte: istToUtc(startDate), $lte: istToUtc(endDate) },
            status: {
                $in: [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.SKIPPED],
            },
        }, {
            sort: { queueNumber: 1 },
        }, AppointmentMapper.toDomain);
    }
    async countAllAppointmentbyDoctorId(doctorId) {
        this._logger.info("Counint", { doctorId });
        return await super.count({
            doctor_id: doctorId,
            status: APPOINTMENT_STATUS.CONFIRMED,
        });
    }
    findDoctorAppointmentForRange(doctorId, startTime, endTime) {
        const start = new Date(startTime);
        const end = new Date(endTime);
        return super.find({
            doctor_id: doctorId,
            start_time: { $gte: start, $lte: end },
            status: {
                $nin: [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.EXPIRED],
            },
        }, {}, AppointmentMapper.toDomain);
    }
    findActiveQueueByDoctorAndTime(doctorId, startTime) {
        const dayStart = new Date(startTime);
        dayStart.setHours(0, 0, 0, 0);
        return super.find({ doctor_id: doctorId, start_time: { $lte: startTime, $gte: dayStart } }, { sort: { start_time: 1, queue_number: 1 } }, AppointmentMapper.toDomain);
    }
    async findAllWithFilters(filters) {
        const pipeline = this.buildAppointmentPipeline(filters);
        const result = await super.aggregate(pipeline);
        return result.map((doc) => ({
            appointment: AppointmentMapper.toDomain(doc),
            patientName: doc.patient.first_name,
            doctorName: doc.doctor.full_name,
        }));
    }
    buildAppointmentPipeline(filters, paginated = false) {
        const query = {
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
        const pipeline = [
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
    async countAppointmentWithPatientAndDoctor(patientId, doctorId) {
        return await super.count({ patient_id: patientId, doctor_id: doctorId });
    }
    async getDashboardStatistics(period) {
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
        const [result] = await super.aggregate([
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
        if (result === undefined) {
            return {
                totalAppointments: 0,
                completedAppointments: 0,
                upcomingAppointments: 0,
                todayAppointments: 0,
                appointmentAnalytics: [{ label: "", count: 0 }],
                appointmentStatusDistribution: {
                    confirmed: 0,
                    ongoing: 0,
                    completed: 0,
                    cancelled: 0,
                    noShow: 0,
                    expired: 0,
                },
            };
        }
        const statusMap = Object.fromEntries(result.appointmentStatusDistribution.map((x) => [x._id, x.count]));
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
                cancelled: (statusMap.CANCELLED_BY_DOCTOR ?? 0) +
                    (statusMap.CANCELLED_BY_PATIENT ?? 0),
                noShow: statusMap.NO_SHOW ?? 0,
                expired: statusMap.EXPIRED ?? 0,
            },
        };
    }
    async getDoctorAppointmentStatusDistribution(doctorId) {
        const [result] = await super.aggregate([
            {
                $match: {
                    doctor_id: doctorId,
                    is_deleted: false,
                },
            },
            {
                $facet: {
                    totalAppointments: [{ $count: "count" }],
                    appointmentStatusDistribution: [
                        {
                            $group: {
                                _id: "$status",
                                count: { $sum: 1 },
                            },
                        },
                    ],
                },
            },
        ]);
        if (!result) {
            return {
                totalAppointments: 0,
                appointmentStatusDistribution: {
                    confirmed: 0,
                    ongoing: 0,
                    completed: 0,
                    cancelled: 0,
                    noShow: 0,
                    expired: 0,
                },
            };
        }
        const statusMap = Object.fromEntries(result.appointmentStatusDistribution.map((x) => [x._id, x.count]));
        return {
            totalAppointments: result.totalAppointments[0]?.count ?? 0,
            appointmentStatusDistribution: {
                confirmed: statusMap.CONFIRMED ?? 0,
                ongoing: statusMap.ONGOING ?? 0,
                completed: statusMap.COMPLETED ?? 0,
                cancelled: (statusMap.CANCELLED_BY_DOCTOR ?? 0) +
                    (statusMap.CANCELLED_BY_PATIENT ?? 0),
                noShow: statusMap.NO_SHOW ?? 0,
                expired: statusMap.EXPIRED ?? 0,
            },
        };
    }
}
//# sourceMappingURL=AppointmentRepository.js.map