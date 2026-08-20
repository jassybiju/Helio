import type {
  IGetAllAppointmentDTO,
  IGetAllAppointmentInput,
} from "#application/use-cases/admin/appointments/getAllAppointment/IGetAllAppointmentDTO.js";

export interface IGetAllAppointmentUseCase {
  execute(input: IGetAllAppointmentInput): Promise<IGetAllAppointmentDTO>;
}
