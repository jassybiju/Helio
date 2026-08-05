import type { IGetDoctorDashboardUseCase } from "#application/ports/use-cases/doctor/dashboard/IGetDoctorDashboardUseCase.js";
import type { IGetDoctorDashboardDTO } from "./IGetDoctorDashboardDTO.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import { istToUtc } from "#shared/utils/date.utils.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import {
  APPOINTMENT_STATUS,
  BOOKING_PERIOD,
} from "#domain/common/enums/appointment.enum.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";

export class GetDoctorDashboardUseCase implements IGetDoctorDashboardUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _walletRepo: IWalletRepository,
    private readonly _transactionRepo: IWalletTransactionRepository
  ) {}
  async execute(
    doctorId: string,
    period: BOOKING_PERIOD
  ): Promise<IGetDoctorDashboardDTO> {
    this._logger.info("Get Doctor Dashboard attempt", { doctorId });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const now = new Date();
    const fakeStartDateIST = new Date(
      now.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" })
    );

    fakeStartDateIST.setDate(fakeStartDateIST.getDate() + 1);
    fakeStartDateIST.setHours(0, 0, 0, 0);

    const endDateIST = new Date(
      now.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" })
    );

    endDateIST.setDate(endDateIST.getDate() + 1);
    endDateIST.setHours(23, 59, 59, 999);

    const appointments =
      await this._appointmentRepo.findDoctorAppointmentForRange(
        doctor.id,
        istToUtc(fakeStartDateIST),
        istToUtc(endDateIST)
      );

    const bookingTrend = await this._appointmentRepo.getDoctorBookingTrend(
      doctor.id,
      period
    );
    const totalCompletedAppointments =
      await this._appointmentRepo.findAllWithFilters({
        status: APPOINTMENT_STATUS.COMPLETED,
        doctorId: doctor.id,
      });

    const wallet = await this._walletRepo.findByUserId(doctor.id);
    if (!wallet) {
      throw new NotFoundError(MESSAGE.WALLET_NOT_FOUND);
    }
    const transactions = await this._transactionRepo.findNWithWalletId(
      wallet.id,
      5
    );
    return {
      summary: {
        todayAppointments: appointments.length,
        upcomingAppointments: appointments.filter((appointment) =>
          [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.SKIPPED].includes(
            appointment.status
          )
        ).length,
        totalAppointmentsCompleted: totalCompletedAppointments.length,
        todaysCompletedAppointments: appointments.filter(
          (appointment) => appointment.status === APPOINTMENT_STATUS.COMPLETED
        ).length,
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
