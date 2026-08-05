import type { IDoctorViewAllAppointmentDTO } from "#application/use-cases/doctor/appointment/doctorViewAllAppointment/IDoctorViewAllAppointmentDTO.js";
import type { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import type { PaginationResponse } from "#shared/types/pagination.types.js";
export type DoctorViewAllInput = {
    search?: string;
    date?: Date;
    status?: APPOINTMENT_STATUS | null;
    type?: CONSULTATION_TYPE | null;
    page: number;
    limit: number;
};
export interface IDoctorViewAllAppointmentUseCase {
    execute(doctorId: string, input: DoctorViewAllInput): Promise<PaginationResponse<IDoctorViewAllAppointmentDTO[]>>;
}
//# sourceMappingURL=IDoctorViewAllAppointmentUseCase.d.ts.map