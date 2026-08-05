import type { IGetAllAppointmentsDTO } from "#application/use-cases/patient/appointments/getAllAppointments/IGetAllAppointmentsDTO.js";
export interface IGetAllAppointmentsUseCase {
    execute(patientId: string, query: {
        page: number;
        limit: number;
        status?: string;
    }): Promise<IGetAllAppointmentsDTO>;
}
//# sourceMappingURL=IGetAllAppointmentsUsecase.d.ts.map