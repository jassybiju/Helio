import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetPatientLiveQueueUseCase } from "#application/ports/use-cases/patient/appointments/IGetPatientLiveQueueUseCase.js";
export declare class GetPatientLiveQueueUseCase implements IGetPatientLiveQueueUseCase {
    private readonly _logger;
    private readonly _patienRepo;
    private readonly _appointmentRepo;
    constructor(_logger: ILogger, _patienRepo: IPatientRepository, _appointmentRepo: IAppointmentRepository);
    execute(appointmentId: string, patientId: string): Promise<{
        queueNumber: number;
        queueNumberOfOngoingAppointment: number;
        timeLeftSeconds: string;
    }>;
    private _formatToHHMMSS;
}
//# sourceMappingURL=GetPatientLiveQueueUseCase.d.ts.map