import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type {
  GetDoctorUseCaseResult,
  IGetDoctorUseCase,
} from "#application/ports/use-cases/admin/doctor/IGetDoctorUseCase.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class GetDoctorUseCase implements IGetDoctorUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _fileUpload: IFileUpload,
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}

  async execute(doctorId: string): Promise<GetDoctorUseCaseResult> {
    this._logger.info("Get doctor attempt by admin", { doctorId });

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError("Doctor Not found", HTTPStatus.NOT_FOUND);
    }

    const documentUrl = doctor.documentKey
      ? await this._fileUpload.getFileUrl(doctor.documentKey, true)
      : null;

    const verificationHistory = await Promise.all(
      doctor.verificationHistory.map(async (his) => ({
        status: his.status,
        reason: his.reason,
        documentUrl: his.documentKey
          ? await this._fileUpload.getFileUrl(his.documentKey, true)
          : null,
        actedAt: his.actedAt.toISOString(),
      }))
    );

    const { totalAppointments, appointmentStatusDistribution } =
      await this._appointmentRepo.getDoctorAppointmentStatusDistribution(
        doctor.id
      );

    return {
      doctor,
      documentUrl,
      verificationHistory,
      totalAppointments,
      appointmentStatusDistribution,
    };
  }
}
