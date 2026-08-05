import { AppError } from "#shared/errors/AppError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { CONSULTATION_TYPE, SLOT_STATUS, } from "#domain/common/enums/doctorShift.enum.js";
import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
export class GetSlotUseCase {
    _logger;
    _doctorRepo;
    _doctorShiftRepo;
    _blockSlotRepo;
    _slotService;
    _appointmentRepo;
    _reviewRepo;
    _patientRepo;
    _fileUpload;
    constructor(_logger, _doctorRepo, _doctorShiftRepo, _blockSlotRepo, _slotService, _appointmentRepo, _reviewRepo, _patientRepo, _fileUpload) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._doctorShiftRepo = _doctorShiftRepo;
        this._blockSlotRepo = _blockSlotRepo;
        this._slotService = _slotService;
        this._appointmentRepo = _appointmentRepo;
        this._reviewRepo = _reviewRepo;
        this._patientRepo = _patientRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(doctorId, patientId, reviewInput) {
        this._logger.info("Get Slot Attempt", { doctorId, reviewInput });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        const istNow = new Date();
        const endDate = new Date(istNow);
        endDate.setDate(endDate.getDate() + 7);
        const shifts = await this._doctorShiftRepo.findAllByDoctorId(doctorId);
        const blockedShift = await this._blockSlotRepo.findByDoctorFromRange(doctorId, istNow, endDate);
        const slots = this._slotService.generateSlotsFromRange(shifts, istNow, endDate);
        const appointments = await this._appointmentRepo.findDoctorAppointmentForRange(doctor.id, istNow, endDate);
        let result = {};
        // for (const slot of slots) {
        //   if (this.isSlotBlocked(slot, blockedShift)) continue;
        //   if (slot.startTime < istNow) continue;
        //   const dateKey = new Intl.DateTimeFormat("en-CA", {
        //     timeZone: "Asia/Kolkata",
        //     year: "numeric",
        //     month: "2-digit",
        //     day: "2-digit",
        //   }).format(slot.startTime);
        //   if (!result[dateKey]) {
        //     result[dateKey] = {
        //       clinic: {
        //         slots: [] as { time: string; status: SLOT_STATUS }[],
        //         location: "",
        //       },
        //       online: { slots: [] },
        //     };
        //   }
        //   if (slot.consultationType === CONSULTATION_TYPE.ONLINE) {
        //     const status = this.getSlotStatus(slot, blockedShift, appointments);
        //     result[dateKey]?.online.slots.push({
        //       time: slot.startTime.toISOString(),
        //       status: status,
        //     });
        //   } else if (slot.consultationType == CONSULTATION_TYPE.CLINIC) {
        //     if (result[dateKey]?.clinic.location === "") {
        //       result[dateKey]!.clinic.location = slot.location!;
        //     }
        //     result[dateKey]?.clinic.slots.push({
        //       time: slot.startTime.toISOString(),
        //       status: this.getSlotStatus(slot, blockedShift, appointments),
        //     });
        //   }
        // }
        for (const slot of slots) {
            if (this.isSlotBlocked(slot, blockedShift))
                continue;
            const dateKey = new Intl.DateTimeFormat("en-CA", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }).format(slot.startTime);
            if (!result[dateKey]) {
                result[dateKey] = {
                    clinic: { slots: [], location: "" },
                    online: { slots: [] },
                };
            }
            if (slot.consultationType === CONSULTATION_TYPE.ONLINE) {
                const status = this.getSlotStatus(slot, blockedShift, appointments, patientId);
                result[dateKey]?.online.slots.push({
                    time: slot.startTime.toISOString(),
                    status,
                });
            }
            else if (slot.consultationType == CONSULTATION_TYPE.CLINIC) {
                const status = this.getSlotStatus(slot, blockedShift, appointments, patientId);
                if (result[dateKey]?.clinic.location === "") {
                    result[dateKey].clinic.location = slot.location;
                }
                result[dateKey]?.clinic.slots.push({
                    time: slot.startTime.toISOString(),
                    status,
                });
            }
        }
        const reviews = await this._reviewRepo.findManyByDoctorIdPaginated(doctor.id, reviewInput?.page ?? 1, reviewInput?.limit ?? 5);
        const patients = await this._patientRepo.findByIds([
            ...new Set(reviews.map((review) => review.patientId)),
        ]);
        const totalReviews = await this._reviewRepo.countRatingsByDoctorId(doctor.id);
        const profilePic = doctor.profilePicKey
            ? this._fileUpload.getFileUrl(doctor.profilePicKey)
            : null;
        return {
            slots: result,
            doctor: {
                doctorId: doctor.id,
                fullName: doctor.fullName,
                speciality: doctor.specialization,
                clinicFee: doctor.clinicFee,
                onlineFee: doctor.onlineFee,
                profilePic: profilePic,
                yearsOfExperience: doctor.yearsOfExperience,
            },
            reviews: reviews.map((review) => {
                const patient = patients.find((p) => p.id === review.patientId);
                return {
                    id: review.id,
                    comments: review.comments,
                    patientName: patient?.fullName ?? "No Name",
                    profilePic: patient?.profilePicKey
                        ? this._fileUpload.getFileUrl(patient.profilePicKey)
                        : null,
                    ratings: review.rating,
                    createdAt: review.createdAt,
                };
            }),
            totalReviews,
        };
    }
    isSlotBlocked(slot, blockedShifts) {
        return blockedShifts.some((block) => slot.startTime < block.endTime && slot.endTime > block.startTime);
    }
    getSlotStatus(slot, blockedShifts, appointments, patientId) {
        const isBlocked = blockedShifts.some((block) => slot.startTime < block.endTime && slot.endTime > block.startTime);
        if (isBlocked) {
            return SLOT_STATUS.BLOCKED;
        }
        const slotAppointments = appointments.filter((appointment) => appointment.startTime.getTime() === slot.startTime.getTime() &&
            appointment.consultationType === slot.consultationType);
        // if current patient already booked this slot
        if (patientId) {
            const alreadyBookedByPatient = slotAppointments.some((appointment) => appointment.patientId === patientId &&
                appointment.status !== APPOINTMENT_STATUS.EXPIRED);
            if (alreadyBookedByPatient) {
                return SLOT_STATUS.BOOKED;
            }
        }
        const activeAppointments = slotAppointments.filter((appointment) => appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_DOCTOR &&
            appointment.status !== APPOINTMENT_STATUS.EXPIRED &&
            appointment.status !== APPOINTMENT_STATUS.CANCELLED_BY_PATIENT);
        if (activeAppointments.length >= slot.capacity) {
            return SLOT_STATUS.BOOKED;
        }
        return SLOT_STATUS.AVAILABLE;
    }
}
//# sourceMappingURL=GetSlotUseCase.js.map