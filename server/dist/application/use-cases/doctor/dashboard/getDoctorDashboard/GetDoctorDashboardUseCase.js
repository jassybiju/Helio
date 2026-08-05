import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { istToUtc } from "#shared/utils/date.utils.js";
import { APPOINTMENT_STATUS, BOOKING_PERIOD, } from "#domain/common/enums/appointment.enum.js";
export class GetDoctorDashboardUseCase {
    _logger;
    _doctorRepo;
    _appointmentRepo;
    _patientRepo;
    _walletRepo;
    _transactionRepo;
    constructor(_logger, _doctorRepo, _appointmentRepo, _patientRepo, _walletRepo, _transactionRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._appointmentRepo = _appointmentRepo;
        this._patientRepo = _patientRepo;
        this._walletRepo = _walletRepo;
        this._transactionRepo = _transactionRepo;
    }
    async execute(doctorId, period) {
        this._logger.info("Get Doctor Dashboard attempt", { doctorId });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const now = new Date();
        const fakeStartDateIST = new Date(now.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" }));
        fakeStartDateIST.setDate(fakeStartDateIST.getDate() + 1);
        fakeStartDateIST.setHours(0, 0, 0, 0);
        const endDateIST = new Date(now.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" }));
        endDateIST.setDate(endDateIST.getDate() + 1);
        endDateIST.setHours(23, 59, 59, 999);
        const appointments = await this._appointmentRepo.findDoctorAppointmentForRange(doctor.id, istToUtc(fakeStartDateIST), istToUtc(endDateIST));
        const bookingTrend = await this._appointmentRepo.getDoctorBookingTrend(doctor.id, period);
        const totalCompletedAppointments = await this._appointmentRepo.findAllWithFilters({
            status: APPOINTMENT_STATUS.COMPLETED,
            doctorId: doctor.id,
        });
        const wallet = await this._walletRepo.findByUserId(doctor.id);
        if (!wallet) {
            throw new NotFoundError(MESSAGE.WALLET_NOT_FOUND);
        }
        const transactions = await this._transactionRepo.findNWithWalletId(wallet.id, 5);
        return {
            summary: {
                todayAppointments: appointments.length,
                upcomingAppointments: appointments.filter((appointment) => [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.SKIPPED].includes(appointment.status)).length,
                totalAppointmentsCompleted: totalCompletedAppointments.length,
                todaysCompletedAppointments: appointments.filter((appointment) => appointment.status === APPOINTMENT_STATUS.COMPLETED).length,
                walletBalance: wallet.balance,
            },
            bookingTrend: {
                period: period,
                labels: bookingTrend.map((x) => x.label),
                values: bookingTrend.map((x) => x.count),
            },
            transactions: transactions.map((trans) => ({
                id: trans.id,
                date: trans.createdAt.toDateString(),
                type: trans.type,
                description: trans.description ?? "",
                amount: trans.amount,
                status: trans.status,
            })),
        };
    }
}
//# sourceMappingURL=GetDoctorDashboardUseCase.js.map