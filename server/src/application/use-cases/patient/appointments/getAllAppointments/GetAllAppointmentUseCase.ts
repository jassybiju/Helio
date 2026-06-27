import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILabReportRepository } from "@application/ports/repositories/ILabReportRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IGetAllAppointmentsUseCase } from "@application/ports/use-cases/patient/appointments/IGetAllAppointmentsUsecase.ts";
import type { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import type { IGetAllAppointmentsDTO } from "./IGetAllAppointmentsDTO.ts";
import type { IConsultationRepository } from "@application/ports/repositories/IConsultationRepository.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";

export class GetAllAppointmentUseCase implements IGetAllAppointmentsUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _consultationRepo: IConsultationRepository,
    private readonly _labRepo: ILabReportRepository,
    private readonly _fileUpload : IFileUpload,
  ) {}
  async execute(
    patientId: string,
    query: { page: number; limit: number; status?: APPOINTMENT_STATUS }
  ): Promise<IGetAllAppointmentsDTO> {
    this._logger.info("Get ALlAppointmetn ", { patientId, query });

    const patient = await this._patientRepo.findById(patientId);

    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
    }
    console.log(patient.id);
    const { appointments, totalCount } =
      await this._appointmentRepo.findManyWithFilters({
        patientId: patient.id,
        page: query.page,
        limit: Number(query.limit),
        order: "asc",
        status: query.status ?? null,
      });

    const result: IGetAllAppointmentsDTO["appointments"] = await Promise.all(
      appointments.map(async (res) => {
        const appointment = res.appointment;
        const doctor = await this._doctorRepo.findById(appointment.doctorId);

        const consultation = await this._consultationRepo.findByAppointmentId(
          appointment.id
        );

        const hasLabReports = await this._labRepo.findByAppointmentId(
          appointment.id
        );

        return {
          id: appointment.id,
          patientId: appointment.patientId,
          doctor: {
            id: doctor?.id ?? "",
            name: doctor?.fullName ?? "Unknown Doctor",
            specialization: doctor?.specialization ?? "",
            profilePicture: doctor?.profilePicKey ? this._fileUpload.getFileUrl(doctor.profilePicKey) : null,
            // profilePicture: doctor?.profilePicture ?? null,
          },

          appointment: {
            startTime: appointment.startTime.toISOString(),
            endTime: appointment.endTime.toISOString(),

            consultationType: appointment.consultationType,

            status: appointment.status,
            paymentStatus: appointment.paymentStatus,

            totalAmount: appointment.totalAmount,
          },

          consultation: {
            exists: !!consultation,
            completed: !!consultation?.endedAt,
          },

          hasLabReports: !!hasLabReports,
        };
      })
    );

    return {
      appointments: result,

      totalCount,

      page: query.page,
      limit: query.limit,
    };
  }
}
