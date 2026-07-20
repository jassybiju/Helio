import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IDoctorShiftRepository } from "@application/ports/repositories/IDoctorShiftRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IUnitOfWork } from "@application/ports/services/IUnitOfWork.ts";
import type {
  IPatientRescheduleUseCase,
  IPatientResheduleAppointmentInput,
} from "@application/ports/use-cases/patient/appointments/cancellation/IPatientRescheduleUseCase.ts";
import {
  APPOINTMENT_STATUS,
  PAYMENT_STATUS,
} from "@domain/common/enums/appointment.enum.ts";
import { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { Appointment } from "@domain/entities/Appointment.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ConflictError } from "@shared/errors/ConflictError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { jsToEnumDay, utcToIst } from "@shared/utils/date.utils.ts";

export class PatientRescheduleAppointmentUseCase implements IPatientRescheduleUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _doctorShiftRepo: IDoctorShiftRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _uow: IUnitOfWork
  ) {}
  async execute(
    patientId: string,
    appointmentId: string,
    data: IPatientResheduleAppointmentInput
  ): Promise<void> {
    this._logger.info("Patient Reshedule Appointment Attempt", {
      patientId,
      appointmentId,
      data,
    });

    return this._uow.execute(async (session) => {
      const patientRepo = this._patientRepo.withSession(session);
      const appointmentRepo = this._appointmentRepo.withSession(session);
      const doctorRepo = this._doctorRepo.withSession(session);
      const doctorShiftRepo = this._doctorShiftRepo.withSession(session);

      const patient = await patientRepo.findById(patientId);

      if (!patient) {
        throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
      }

      const appointment = await appointmentRepo.findById(appointmentId);

      if (!appointment) {
        throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
      }

      if (appointment.patientId !== patient.id) {
        throw new ConflictError(MESSAGE.APPOINTMENT_NOT_ACCESS);
      }

      const doctor = await doctorRepo.findById(appointment.doctorId);
      if (!doctor) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      if (appointment.status !== APPOINTMENT_STATUS.CONFIRMED) {
        throw new ConflictError("Only confirmed appointments cna be cancelled");
      }

      if (appointment.paymentStatus !== PAYMENT_STATUS.PAID) {
        throw new ConflictError("Only paid appointments can be refunded");
      }

      const date = new Date();
      date.setHours(0, 0, 0, 0);

      // const fakeDate = date
      // fakeDate.setDate(fakeDate.getDate() + 2)

      const appointmentDate = new Date(appointment.startTime);
      appointmentDate.setHours(0, 0, 0, 0);
      if (appointmentDate == date) {
        throw new ConflictError("Cant cancel on appointment day");
      }

      const start = new Date(data.startTime);

      const istStart = utcToIst(start);

      const shifts = await doctorShiftRepo.findAllByDoctorAndDay(
        doctor.id,
        jsToEnumDay[istStart.getDay()]!
      );

      if (!shifts.length) {
        throw new ConflictError("No Shift Available for selected day");
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
        throw new ConflictError("Invalid Slot Selected");
      }

      const shiftStart = matchedShift.startTime.toDate(istStart);

      const diff = (istStart.getTime() - shiftStart.getTime()) / (1000 * 60);

      if (diff % matchedShift.slotIntervalInMinutes !== 0) {
        throw new ConflictError("Invalid Slot Interval");
      }

      const count = await appointmentRepo.countOccupiedSlots(
        doctor.id,
        start,
        data.consultationType
      );

      if (count >= matchedShift.capacityPerSlot) {
        throw new ConflictError("Slot is full");
      }

      const existing = await appointmentRepo.findExistingPatientAppointment(
        patient.id,
        doctor.id,
        start
      );

      if (existing) {
        throw new ConflictError("You aleady booked this slot");
      }

      const PLATFORM_FEE = Number(process.env.PLATFORM_FEE)!;

      let consultationFee =
        doctor[
          data.consultationType === CONSULTATION_TYPE.CLINIC
            ? "clinicFee"
            : "onlineFee"
        ]!;

      const AP_PREFIX = process.env.AP_PREFIX!;

      const APPOINTMENT_ID = this._idGenerator.generate(AP_PREFIX);
      const endTime = new Date(
        start.getTime() + matchedShift.slotIntervalInMinutes * 60 * 1000
      );

      const newAppointment = Appointment.create({
        appointmentId: APPOINTMENT_ID,
        patientId,
        doctorId: doctor.id,
        consultationType: data.consultationType,
        consultationFee: consultationFee,
        startTime: start,
        endTime,
        queueNumber: count,
        platformFee: PLATFORM_FEE,
        rescheduleCount: (appointment.rescheduleCount ?? 0) + 1,
        rescheduledBy: USER_ROLES.PATIENT,
        rescheduleReason: appointment.rescheduleReason!,
        rescheduledFromAppointmentId: appointment.id,
      });

      newAppointment.paymentCompleted(appointment.paymentId ?? undefined);
      appointment.cancelByPatientComplete();

      await Promise.all([
        appointmentRepo.update(appointment),
        appointmentRepo.create(newAppointment),
      ]);
    });
  }
}
