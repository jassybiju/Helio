import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
export class GetAdminDashboardUseCase {
    _logger;
    _appointmentRepo;
    _doctorRepo;
    _patientRepo;
    _transactionRepo;
    _walletRepo;
    constructor(_logger, _appointmentRepo, _doctorRepo, _patientRepo, _transactionRepo, _walletRepo) {
        this._logger = _logger;
        this._appointmentRepo = _appointmentRepo;
        this._doctorRepo = _doctorRepo;
        this._patientRepo = _patientRepo;
        this._transactionRepo = _transactionRepo;
        this._walletRepo = _walletRepo;
    }
    async execute(period) {
        this._logger.info("GET ADMIN DASHBOARD", { period });
        const [appointments, doctorAnalytics, patientAnalytics, totalDoctors, totalPatients, revenueAnalytics, wallet,] = await Promise.all([
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
//# sourceMappingURL=GetAdminDashboardUseCase.js.map