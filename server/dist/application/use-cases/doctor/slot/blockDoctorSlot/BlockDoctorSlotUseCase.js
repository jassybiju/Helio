import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { DoctorBlockShift } from "#domain/entities/DoctorBlockShift.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class BlockDoctorSlotUseCase {
    _logger;
    _idGenerator;
    _blockShiftRepo;
    _appointmentRepo;
    _uow;
    _notificationService;
    constructor(_logger, _idGenerator, _blockShiftRepo, _appointmentRepo, _uow, _notificationService) {
        this._logger = _logger;
        this._idGenerator = _idGenerator;
        this._blockShiftRepo = _blockShiftRepo;
        this._appointmentRepo = _appointmentRepo;
        this._uow = _uow;
        this._notificationService = _notificationService;
    }
    async execute(doctorId, input) {
        this._logger.info("Block schedule attempt", input);
        const BLOCK_PREFIX = process.env.BLOCK_PREFIX;
        const blockShift = new DoctorBlockShift(this._idGenerator.generate(BLOCK_PREFIX), doctorId, input.startTime, input.endTime, input.reason, new Date());
        return await this._uow.execute(async (session) => {
            const blockShiftRepo = this._blockShiftRepo.withSession(session);
            const appointmentRepo = this._appointmentRepo.withSession(session);
            // check if current blocks overrides existing ones
            const existingBlocks = await blockShiftRepo.findByDate(doctorId, blockShift.startTime);
            if (!blockShift.isNotOverlapping(existingBlocks)) {
                throw new AppError("Block at given time already exists", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const dayStart = new Date(input.startTime);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(input.endTime);
            dayEnd.setHours(23, 59, 59, 999);
            const appointments = await appointmentRepo.findAllWithFilters({
                doctorId,
                startDate: dayStart,
                endDate: dayEnd,
                statuses: [APPOINTMENT_STATUS.ONGOING, APPOINTMENT_STATUS.CONFIRMED],
            });
            const overlappingAppointments = appointments.filter(({ appointment }) => appointment.startTime < input.endTime &&
                appointment.endTime > input.startTime);
            if (overlappingAppointments.length > 0 && !input.force) {
                return {
                    blocked: false,
                    appointments: overlappingAppointments.map(({ appointment, patientName }) => ({
                        appointmentId: appointment.id,
                        patientName,
                        date: appointment.startTime,
                        type: appointment.consultationType,
                    })),
                    blockDetails: {
                        startTime: input.startTime,
                        endTime: input.endTime,
                        reason: input.reason,
                    },
                    reason: "APPOINTMENT_OVERLAP",
                };
            }
            await Promise.all(overlappingAppointments.map(async ({ appointment }) => {
                appointment.cancelByDoctor(input.reason);
                this._notificationService.notify(appointment.patientId, USER_ROLES.PATIENT, "Appointment Canclled By Doctor Handle", `Appointment ${appointment.id} cancelled by doctor becuase of ${input.reason}`);
                return appointmentRepo.update(appointment);
            }));
            // save block
            await blockShiftRepo.create(blockShift);
            return { blocked: true };
        });
    }
}
//# sourceMappingURL=BlockDoctorSlotUseCase.js.map