import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";

export type IRespondPatientResheduleAppointmentInput = {
  startTime: Date;
  consultationType: CONSULTATION_TYPE;
};

export interface IRespondPatientResheduleAppointmentUseCase {
  execute(
    patientId: string,
    appointmentId: string,
    data: IRespondPatientResheduleAppointmentInput
  ): Promise<void>;
}
