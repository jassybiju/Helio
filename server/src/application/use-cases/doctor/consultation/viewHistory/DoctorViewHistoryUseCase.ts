import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IConsultationRepository } from "@application/ports/repositories/IConsultationRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILabReportRepository } from "@application/ports/repositories/ILabReportRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IViewHistoryUseCase } from "@application/ports/use-cases/doctor/consultation/IViewHistoryUseCase.ts";
import { LAB_REPORT_STATUS } from "@domain/common/enums/doctorShift.enum.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import type { IDoctorViewHistoryDTO } from "./IDoctorViewHistoryDTO.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";

export class DoctorViewHistoryUseCase implements IViewHistoryUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _consultationRepo: IConsultationRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _labRepo: ILabReportRepository,
    private readonly _fileUpload: IFileUpload
  ) {}
  async execute(
    doctorId: string,
    appointmentId: string,
    page = 1,
    limit = 10
  ): Promise<IDoctorViewHistoryDTO> {
    this._logger.info("Doctor View History", { doctorId, appointmentId });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const appointment = await this._appointmentRepo.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
    }

    const currentConsultation =
      await this._consultationRepo.findByAppointmentId(appointment.id);

    if (!currentConsultation) {
      throw new NotFoundError(MESSAGE.CONSULTATION_NOT_FOUND);
    }

    if (doctor.id !== currentConsultation.doctorId) {
      throw new ForbiddenError(MESSAGE.CONSULTATION_NOT_ACCESS);
    }

    const consultations = await this._consultationRepo.findPatientHistory(
      appointment.patientId,
      page > 0 ? page : 1,
      limit,
      currentConsultation.id
    );

    const labReports = await this._labRepo.findByPatient(
      appointment.patientId,
      page > 0 ? page : 1,

      limit,
      [LAB_REPORT_STATUS.UPLOADED]
    );

    const consultationHistory = await Promise.all(
      consultations.map(async (consultation) => {
        const [appointment, doctor] = await Promise.all([
          this._appointmentRepo.findById(consultation.appointmentId),
          this._doctorRepo.findById(consultation.doctorId),
        ]);

        if (!appointment) {
          throw new Error(MESSAGE.APPOINTMENT_NOT_FOUND);
        }

        if (!doctor) {
          throw new Error(MESSAGE.DOCTOR_NOT_FOUND);
        }

        return {
          consultationId: consultation.id,
          type: "CONSULTATION",
          date: appointment.startTime,
          doctor: {
            id: doctor.id,
            name: doctor.fullName,
          },

          appointment: {
            date: appointment.startTime,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            consultationType: appointment.consultationType,
            status: appointment.status,
          },

          diagnosis: {
            primaryDiagnosis: consultation.primaryDiagnosis,
            clinicalObservation: consultation.clinicalObservation,
            generalAdvice: consultation.generalAdvice,
            quickNote: consultation.quickNote,
          },

          vitals: {
            bloodPressure: consultation.vitals?.bloodPressure ?? null,
            temperature: consultation.vitals?.temperature ?? null,
            height: consultation.vitals?.height ?? null,
            weight: consultation.vitals?.weight ?? null,
            heartRate: consultation.vitals?.heartRate ?? null,
            oxygenLevel: consultation.vitals?.oxygenLevel ?? null,
          },

          prescriptions: consultation.prescriptions.map((x) => ({
            name: x.name,
            durationInDays: x.durationInDays,
            instructions: x.instruction,
            foodTiming: x.foodTiming,
            timings: x.timings,
          })),

          followUp: {
            medicationPeriod: consultation.medicationPeriod,
            freeFollowUpValidUntil: null,
            freeFollowUpUsed: false,
          },

          timestamps: {
            createdAt: consultation.createdAt,
            endedAt: consultation.endedAt,
            startedAt: consultation.startedAt,
          },
        };
      })
    );

    const labReportHistory =
      labReports.reports?.map((report) => ({
        id: report.id,
        type: "LAB_REPORT",
        date: report.uploadedAt ?? report.requestedAt,

        testName: report.testName,
        instructions: report.instructions,

        requestedAt: report.requestedAt,

        uploadedAt: report.uploadedAt,

        documentKey: this._fileUpload.getFileUrl(
          report.documentKey ?? "",
          true
        ),

        status: report.status,
      })) ?? [];
    console.log(consultationHistory, labReportHistory);

    const history = [...consultationHistory, ...labReportHistory].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const consultationCount =
      await this._consultationRepo.countAllPatientHistory(
        appointment.patientId
      );
    const total = labReports.totalCount + consultationCount;

    return {
      history,

      pagination: {
        page,
        limit,
        totalCount: total,
      },
    };
  }
}
