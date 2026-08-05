import type { IGetAdminDashboardUseCase } from "#application/ports/use-cases/admin/IGetAdminDashboardUseCase.js";
import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import type { IGetAdminDashboardDTO } from "./IGetAdminDashboardDTO.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";

export class GetAdminDashboardUseCase implements IGetAdminDashboardUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _transactionRepo: IWalletTransactionRepository,
    private readonly _walletRepo: IWalletRepository
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
      wallet,
    ] = await Promise.all([
      this._appointmentRepo.getDashboardStatistics(period),
      this._doctorRepo.getRegistrationAnalytics(period),
      this._patientRepo.getRegistrationAnalytics(period),
      this._doctorRepo.count(),
      this._patientRepo.count(),
      this._transactionRepo.getRevenueAnalytics(period),
      this._walletRepo.findAdminWallet(),
    ]);
    return {
      statistics: {
        todayAppointments: appointments.todayAppointments,
        completedAppointments: appointments.completedAppointments,
        upcomingAppointments: appointments.upcomingAppointments,
        totalAppointments: appointments.totalAppointments,
        totalRevenue: wallet?.balance ?? 0,

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
