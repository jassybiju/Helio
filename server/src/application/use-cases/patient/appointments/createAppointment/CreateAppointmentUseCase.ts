import type {
  ICreateAppointmentInput,
  ICreateAppointmentUseCase,
} from "#application/ports/use-cases/patient/appointments/ICreateAppointmentUseCase.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import type { ICreateAppointmentDTO } from "./ICreateAppointmentDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IDoctorShiftRepository } from "#application/ports/repositories/IDoctorShiftRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import { AppError } from "#shared/errors/AppError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { jsToEnumDay, utcToIst } from "#shared/utils/date.utils.js";
import { Appointment } from "#domain/entities/Appointment.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { INotificationService } from "#application/ports/services/INotificationService.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export class CreateAppointmentUseCase implements ICreateAppointmentUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorShiftRepo: IDoctorShiftRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _notificationService: INotificationService
  ) {}
  async execute(
    patientId: string,
    data: ICreateAppointmentInput
  ): Promise<ICreateAppointmentDTO> {
    this._logger.info("Appointment Create Attempt", { patientId, data });

    // check if doctor exists
    const doctor = await this._doctorRepo.findById(data.doctorId);
    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const start = new Date(data.startTime);

    const istStart = utcToIst(start);

    // check schedule exists on time and day
    const shifts = await this._doctorShiftRepo.findAllByDoctorAndDay(
      data.doctorId,
      jsToEnumDay[istStart.getDay()]!
    );
    if (!shifts.length) {
      throw new AppError(
        "No shift available for selected day",
        HTTPStatus.BAD_REQUEST
      );
    }

    let matchedShift = null;

    for (const shift of shifts) {
      const shiftStart = shift.startTime.toDate(istStart);
      const shiftEnd = shift.endTime.toDate(istStart);
      if (
        istStart >= shiftStart &&
        istStart < shiftEnd &&
        shift.consultationType === data.consultationType
      ) {
        matchedShift = shift;
        break;
      }
    }
    if (!matchedShift) {
      throw new AppError("Invlaid Slot selected", HTTPStatus.BAD_REQUEST);
    }

    const shiftStart = matchedShift.startTime.toDate(istStart);

    const diff = (istStart.getTime() - shiftStart.getTime()) / (1000 * 60);

    if (diff % matchedShift.slotIntervalInMinutes !== 0) {
      throw new AppError("Invalid slot interval", HTTPStatus.BAD_REQUEST);
    }

    // count existing appointment on that schedule
    const count = await this._appointmentRepo.countOccupiedSlots(
      doctor.id,
      start,
      data.consultationType
    );

    if (count >= matchedShift.capacityPerSlot) {
      throw new AppError("Slot is full", HTTPStatus.BAD_REQUEST);
    }

    const existing = await this._appointmentRepo.findExistingPatientAppointment(
      patientId,
      data.doctorId,
      start
    );

    if (existing) {
      throw new AppError(
        "You already booked this slot",
        HTTPStatus.BAD_REQUEST
      );
    }

    const PLATFORM_FEE = Number(process.env.PLATFORM_FEE)!;
    let consultationFee =
      doctor[
        data.consultationType === CONSULTATION_TYPE.CLINIC
          ? "clinicFee"
          : "onlineFee"
      ]!;

    // const confirmedConsultation =
    //   await this._appointmentRepo.countAllAppointmentbyDoctorId(doctor.id);
    // if (confirmedConsultation > 2) {
    //   consultationFee = consultationFee + 10;
    // }

    const AP_PREFIX = process.env.AP_PREFIX!;

    const APPOINTMENTID = this._idGenerator.generate(AP_PREFIX);
    const endTime = new Date(
      start.getTime() + matchedShift.slotIntervalInMinutes * 60 * 1000
    );

    // create appointment
    const appointment = Appointment.create({
      appointmentId: APPOINTMENTID,
      patientId,
      doctorId: data.doctorId,
      consultationType: data.consultationType,
      consultationFee: consultationFee,
      startTime: start,
      endTime,
      queueNumber: count,
      platformFee: PLATFORM_FEE,
    });

    await this._appointmentRepo.create(appointment);

    this._notificationService.notify(
      data.doctorId,
      USER_ROLES.DOCTOR,
      `New Appointment created by ${patientId}`,
      "Appointment created for " + appointment.startTime.toDateString()
    );
    return {
      appointmentId: APPOINTMENTID,
    };
  }
}
