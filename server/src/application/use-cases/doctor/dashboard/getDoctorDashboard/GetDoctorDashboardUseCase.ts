import type { IGetDoctorDashboardUseCase } from "@application/ports/use-cases/doctor/dashboard/IGetDoctorDashboardUseCase.ts";
import type { IGetDoctorDashboardDTO } from "./IGetDoctorDashboardDTO.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import { istToUtc } from "@shared/utils/date.utils.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import type { IWalletRepository } from "@application/ports/repositories/IWalletRepository.ts";

export class GetDoctorDashboardUseCase implements IGetDoctorDashboardUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _patientRepo: IPatientRepository,
    private readonly _walletRepo: IWalletRepository
  ) {}
  async execute(doctorId: string): Promise<IGetDoctorDashboardDTO> {
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

    const totalCompletedAppointments =
      await this._appointmentRepo.findAllWithFilters({
        status: APPOINTMENT_STATUS.COMPLETED,
      });

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
        walletBalance: 1,
      },
      bookingTrend: { period: "7d", labels: ["asd"], values: [1] },
      transactions: [],
    };
  }
}
