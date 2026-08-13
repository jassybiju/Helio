import type { IDoctorViewTodaysAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/IDoctorViewTodaysAppointmentUseCase.js";
import type {
  IDoctorViewTodaysAppointmentDTO,
  ITodayAppointmentCardDTO,
} from "./IDoctorViewTodaysAppointmentDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { istToUtc } from "#shared/utils/date.utils.js";
import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { Appointment } from "#domain/entities/Appointment.js";

export class DoctorViewTodaysAppointmentUseCase implements IDoctorViewTodaysAppointmentUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(doctorId: string): Promise<IDoctorViewTodaysAppointmentDTO> {
    this._logger.info("Doctor View TOdays Appointmetn UseCase", { doctorId });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const now = new Date();
    const fakeStartDateIST = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    fakeStartDateIST.setDate(fakeStartDateIST.getDate() + 1);
    fakeStartDateIST.setHours(0, 0, 0, 0);

    const endDateIST = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    endDateIST.setDate(endDateIST.getDate() + 1);

    endDateIST.setHours(23, 59, 59, 999);

    const appointments =
      await this._appointmentRepo.findDoctorAppointmentForRange(
        doctor.id,
        istToUtc(fakeStartDateIST),
        istToUtc(endDateIST)
      );

    this._logger.debug("APPointmetns", appointments);
    const patientIds = [
      ...new Set(appointments.map((appointment) => appointment.patientId)),
    ];
    const patients = await this._patientRepo.findByIds(patientIds);

    const patientMap = new Map(
      patients.map((patient) => [patient.id, patient])
    );

    const toDto = (
      appointment: Appointment,
      i: number
    ): ITodayAppointmentCardDTO | null => {
      const patient = patientMap.get(appointment.patientId);
      if (!patient) return null;

      return {
        id: appointment.id,
        patient: {
          id: patient.id,
          name: patient.fullName,
          profilePicture: null,
          age: patient.age,
          gender: patient.gender,
        },
        queue: i,
        type: appointment.consultationType,
        status: appointment.status,
        time: appointment.startTime,
      };
    };

    const allDTOs = appointments.map(toDto).filter((x) => x !== null);
    return {
      stats: {
        completed: appointments.filter(
          (appointment) => appointment.status === APPOINTMENT_STATUS.COMPLETED
        ).length,
        skipped: appointments.filter(
          (appointment) => appointment.status === APPOINTMENT_STATUS.SKIPPED
        ).length,
        total: appointments.length,
        upcoming: appointments.filter((appointment) =>
          [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.SKIPPED].includes(
            appointment.status
          )
        ).length,
      },
      skipped: allDTOs.filter(
        (appointment) => appointment.status === APPOINTMENT_STATUS.SKIPPED
      ),
      ongoing: allDTOs.filter(
        (appointment) => appointment.status === APPOINTMENT_STATUS.ONGOING
      ),
      upcoming: allDTOs.filter((appointment) =>
        [APPOINTMENT_STATUS.CONFIRMED].includes(appointment.status)
      )[0],
    };
  }
}
