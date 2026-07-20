import type { IGetAdminDashboardUseCase } from "@application/ports/use-cases/admin/IGetAdminDashboardUseCase.ts";
import { BOOKING_PERIOD } from "@domain/common/enums/appointment.enum.ts";
import type { IGetAdminDashboardDTO } from "./IGetAdminDashboardDTO.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IWalletTransactionRepository } from "@application/ports/repositories/IWalletTransactionRepository.ts";

export class GetAdminDashboardUseCase implements IGetAdminDashboardUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _transactionRepo: IWalletTransactionRepository
  ) {}
  async execute(period: BOOKING_PERIOD): Promise<IGetAdminDashboardDTO> {
    this._logger.info("GET ADMIN DASHBOARD", { period });
    const [
      appointments,
      doctorAnalytics,
      patientAnalytics,
      totalDoctors,
      totalPatients,
      revenueAnalytics,
    ] = await Promise.all([
      this._appointmentRepo.getDashboardStatistics(period),
      this._doctorRepo.getRegistrationAnalytics(period),
      this._patientRepo.getRegistrationAnalytics(period),
      this._doctorRepo.count(),
      this._patientRepo.count(),
      this._transactionRepo.getRevenueAnalytics(period),
    ]);
    return {
      statistics: {
        todayAppointments: appointments.todayAppointments,
        completedAppointments: appointments.completedAppointments,
        upcomingAppointments: appointments.upcomingAppointments,
        totalAppointments: appointments.totalAppointments,
        totalRevenue: 0,

        totalDoctors,
        totalPatients,
      },

      appointmentAnalytics: {
        labels: appointments.appointmentAnalytics.map((x) => x.label),
        appointments: appointments.appointmentAnalytics.map((x) => x.count),
      },

      userGrowth: {
        labels: doctorAnalytics.labels,
        doctors: doctorAnalytics.count,
        patients: patientAnalytics.count,
      },
      appointmentStatusDistribution: appointments.appointmentStatusDistribution,
      revenueAnalytics,
    };
  }
}
