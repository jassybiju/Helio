import type { ICreateAppointmentDTO } from "#application/use-cases/patient/appointments/createAppointment/ICreateAppointmentDTO.js";
import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
export type ICreateAppointmentInput = {
    doctorId: string;
    startTime: Date;
    consultationType: CONSULTATION_TYPE;
};
export interface ICreateAppointmentUseCase {
    execute(patientId: string, data: ICreateAppointmentInput): Promise<ICreateAppointmentDTO>;
}
//# sourceMappingURL=ICreateAppointmentUseCase.d.ts.map