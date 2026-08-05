import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { utcToIst } from "#shared/utils/date.utils.js";
import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
export class GetDoctorWeeklySlotsUsecase {
    _logger;
    _doctorRepo;
    _doctorShiftRepo;
    _slotService;
    _blockSlotRepo;
    _appointmentRepo;
    constructor(_logger, _doctorRepo, _doctorShiftRepo, _slotService, _blockSlotRepo, _appointmentRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._doctorShiftRepo = _doctorShiftRepo;
        this._slotService = _slotService;
        this._blockSlotRepo = _blockSlotRepo;
        this._appointmentRepo = _appointmentRepo;
    }
    async execute(doctorId, _params) {
        this._logger.info("Get Doctor Slots Attempt", { doctorId });
        // const { page, limit } = params;
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        if (!doctor.canAccessPlatform()) {
            throw new AppError(MESSAGE.INVALID_REQUEST, HTTPStatus.FORBIDDEN);
        }
        const istNow = new Date();
        const endDate = new Date(istNow);
        endDate.setDate(endDate.getDate() + 7);
        // get weekly schedule
        const shifts = await this._doctorShiftRepo.findAllByDoctorId(doctor.id);
        const blockedShifts = await this._blockSlotRepo.findByDoctorFromRange(doctorId, istNow, endDate);
        const appointments = await this._appointmentRepo.findActiveInRange(doctorId, istNow, endDate);
        // generate slots for a week
        const slots = this._slotService.generateSlotsFromRange(shifts, istNow, endDate);
        const slotMap = new Map();
        for (const appt of appointments) {
            const key = appt.startTime.toISOString();
            if (!slotMap.has(key)) {
                slotMap.set(key, []);
            }
            slotMap.get(key).push(appt);
        }
        let result = {};
        for (const slot of slots) {
            if (this.isSlotBlocked(slot, blockedShifts)) {
                continue;
            }
            const slotKey = slot.startTime.toISOString();
            const key = utcToIst(slot.startTime).toLocaleDateString("en-US", {
                weekday: "long",
            });
            const appts = slotMap.get(slotKey) || [];
            const shift = shifts.find((s) => slot.shiftId === s.shiftId);
            const capacity = shift?.capacityPerSlot ?? 1;
            const activeAppointments = appts.filter((appt) => appt.status !== APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR &&
                appt.status !== APPOINTMENT_STATUS.CANCELLED_BY_PATIENT &&
                appt.status !== APPOINTMENT_STATUS.EXPIRED);
            slot.setCapacity(capacity);
            slot.setBookedCount(activeAppointments.length);
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(slot);
        }
        return result;
    }
    isSlotBlocked(slot, blockedShifts) {
        return blockedShifts.some((block) => slot.overlaps(block.startTime, block.endTime));
    }
}
//# sourceMappingURL=GetDoctorWeeklySlotsUseCase.js.map