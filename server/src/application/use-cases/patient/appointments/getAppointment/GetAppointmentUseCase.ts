import type { IGetAppointmentUseCase } from "@application/ports/use-cases/patient/appointments/IGetAppointmentUseCase.ts";
import type { IGetAppointmentDTO } from "./IGetAppointmentDTO.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IConsultationRepository } from "@application/ports/repositories/IConsultationRepository.ts";

export class GetAppointmentUseCase implements IGetAppointmentUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _consultationRepo: IConsultationRepository,
    private readonly _doctorRepo: IDoctorRepository
  ) {}
  async execute(
    patientId: string,
    appointmentId: string
  ): Promise<IGetAppointmentDTO> {
    this._logger.info("Get Appotinemnt Attempt", { appointmentId, patientId });

    const patient = await this._patientRepo.findById(patientId);
    if (!patient) {
      throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const appointment = await this._appointmentRepo.findById(appointmentId);

    if (!appointment) {
      throw new AppError("Appointment Not Found", HTTPStatus.NOT_FOUND);
    }
    console.log(patient.id, appointment.patientId, patientId);
    if (appointment.patientId !== patient.id) {
      throw new AppError(
        "Appointment Not of this user",
        HTTPStatus.BAD_REQUEST
      );
    }

    const doctor = await this._doctorRepo.findById(appointment.doctorId);

    if (!doctor) {
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    const consultation = await this._consultationRepo.findByAppointmentId(
      appointment.id
    );
    let consultationDTO = null;
    if (consultation) {
      consultationDTO = {
        primaryDiagnosis: consultation.primaryDiagnosis,
        clinicalObservation: consultation.clinicalObservation,
        generalAdvice: consultation.generalAdvice,
        quickNote: consultation.quickNote,
        prescriptions: consultation.prescriptions.map((pres) => ({
          name: pres.name,
          timings: pres.timings,
          durationInDays: pres.durationInDays,
          foodTiming: pres.foodTiming,
          instruction: pres.instruction,
        })),
        vitals: {
          bloodPressure: consultation.vitals?.bloodPressure,
          oxygenLevel: consultation.vitals?.oxygenLevel,
          heartRate: consultation.vitals?.heartRate,
          temperature: consultation.vitals?.temperature,
          weight: consultation.vitals?.weight,
          height: consultation.vitals?.height,
        },
      };
    }

    return {
      appointmentId: appointment.id,
      doctor: {
        id: doctor.id,
        name: doctor.fullName,
        specialization: doctor.specialization,
        profilePicture: null,
      },

      appointment: {
        id: appointment.id,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        consultationType: appointment.consultationType,
        consultationFee: appointment.consultationFee,
        platformFee: appointment.platformFee,
        totalAmount: appointment.totalAmount,
        status: appointment.status,
      },
      payment: {
        paymentStatus: appointment.paymentStatus,
        paymentId: appointment.paymentId,
      },
      consultation: consultationDTO,
      cancellationReason: appointment.cancellationReason,
      createdAt: appointment.createdAt,
    };
  }
}
