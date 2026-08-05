import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
export type IPatientResheduleAppointmentInput = {
    startTime: Date;
    consultationType: CONSULTATION_TYPE;
};
export interface IPatientRescheduleUseCase {
    execute(patientId: string, appointmentId: string, data: IPatientResheduleAppointmentInput): Promise<void>;
}
//# sourceMappingURL=IPatientRescheduleUseCase.d.ts.map