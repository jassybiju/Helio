import type { IGetPatientDashboardUseCase } from "#application/ports/use-cases/patient/dashboard/IGetPatientDashboardUseCase.js";
import type { IGetPatientDashboardDTO } from "./IGetPatientDashboardDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";

export class GetPatientDashboardUseCase implements IGetPatientDashboardUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async execute(patientId: string): Promise<IGetPatientDashboardDTO> {
    this._logger.info("Get Patient Attempt", { patientId });

    return {
      stats: {
        totalAppointments: 1,
        completedAppointments: 1,
        upcomingAppointments: 1,
        cancelledAppointments: 1,
      },
      vitals: {
        heartRate: "",
        bloodPressure: "",
        oxygenLevel: "",
        temperature: "",
        weight: "",
        height: "",
        fromAppointmentId: "",
        date: new Date(),
      },
      medications: [
        {
          doctorName: "",
          prescription: {
            name: "",
            foodTiming: 1,
            timing: { morning: true, afternoon: true, night: true },
            durationInDays: 1,
            validTill: new Date(),
            instructions: "string",
          },
          fromAppointemnts: "string",
        },
      ],
      nextAppointment: {
        doctorName: "string",
        specialty: "string",
        date: new Date(),
        appointmentId: "string",
      },
    };
  }
}
