import { DoctorShift } from "#domain/entities/DoctorShift.js";
import { Time } from "#domain/value-objects/Time.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class SetDoctorScheduleUseCase {
    _logger;
    _uow;
    _doctorShiftRepo;
    _idGenerator;
    _doctorRepo;
    constructor(_logger, _uow, _doctorShiftRepo, _idGenerator, _doctorRepo) {
        this._logger = _logger;
        this._uow = _uow;
        this._doctorShiftRepo = _doctorShiftRepo;
        this._idGenerator = _idGenerator;
        this._doctorRepo = _doctorRepo;
    }
    async execute(doctorId, input) {
        this._logger.info("Set Doctor ScheduleUseCase", {
            doctorId,
            options: input,
        });
        return this._uow.execute(async (session) => {
            const doctorSlot = this._doctorRepo.withSession(session);
            const shiftRepo = this._doctorShiftRepo.withSession(session);
            // validation if doctor exists
            const doctor = await doctorSlot.findById(doctorId);
            if (!doctor) {
                throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
            }
            if (!doctor.canAccessPlatform()) {
                throw new AppError(MESSAGE.INVALID_REQUEST, HTTPStatus.FORBIDDEN);
            }
            if (!doctor.onlineFee || !doctor.clinicFee) {
                throw new AppError("Set Fee to create scheudle", HTTPStatus.UNPROCESSBLE_ENTITY);
            }
            const { dayOfWeek, location, startTime, endTime, slotIntervalInMinutes, capacityPerSlot, consultationType, } = input;
            // creating new Shift instance
            const SHIFT_PREFIX = process.env.SHIFT_PREFIX;
            const newShifts = [];
            for (const day of dayOfWeek) {
                if (!day)
                    continue;
                const newShift = new DoctorShift(this._idGenerator.generate(SHIFT_PREFIX), doctorId, day, new Time(startTime), new Time(endTime), consultationType, location ?? null, slotIntervalInMinutes, capacityPerSlot, new Date());
                // getting existing shift of the doctor on the day
                const existingShift = await shiftRepo.findAllByDoctorAndDay(doctorId, day);
                // checking if overlap exists
                const isNotOverLapping = newShift.isNotOverLapping(existingShift);
                if (!isNotOverLapping) {
                    throw new AppError(MESSAGE.DOCTOR_SHEDULE_OVERLAP_ERROR, HTTPStatus.UNPROCESSBLE_ENTITY);
                }
                newShifts.push(newShift);
            }
            // saves doctorShift
            await this._doctorShiftRepo.bulkInsert(newShifts);
        });
    }
}
//# sourceMappingURL=SetDoctorScheduleUseCase.js.map